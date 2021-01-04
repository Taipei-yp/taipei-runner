import { Sizes, CollisionBox } from "./models";
import {
  getTimeStamp,
  drawCollisionBoxes,
  createRelativeCollisionBox,
  boxCompare,
} from "./utils";
import Hero, { heroCollisionBoxes, HeroStatus } from "./hero";
import Horizon from "./horizon";
import Obstacle from "./obstacle";
import { gameConfig as config } from "./config";

/** Браузерные события */
const browserEvents = {
  CLICK: "click",
  KEYDOWN: "keydown",
  KEYUP: "keyup",
  MOUSEDOWN: "mousedown",
  MOUSEUP: "mouseup",
  RESIZE: "resize",
  VISIBILITY: "visibilitychange",
  BLUR: "blur",
  FOCUS: "focus",
  LOAD: "load",
};

/**
 * Игра
 */
export default class Runner {
  /**  */
  static keycodes = {
    JUMP: { ArrowUp: 1, Space: 1 } as Record<string, number>, // Up, spacebar
    DUCK: { ArrowDown: 1 } as Record<string, number>, // Down
    RESTART: { Enter: 1 } as Record<string, number>, // Enter
  };

  static _instance: Runner;
  /** Контейнер */
  containerEl!: HTMLElement;
  /**  */
  sizes!: Sizes;
  /**  */
  canvas!: HTMLCanvasElement;
  /**  */
  canvasCtx!: CanvasRenderingContext2D;
  hero!: Hero;
  horizon!: Horizon;
  msPerFrame!: number;

  /** Статусы  */
  status!: {
    started: boolean;
    activated: boolean;
    crashed: boolean;
    paused: boolean;
  };

  /** Задержка отрисовки */
  drawPending!: boolean;
  /** requestId для requestAnimationFrame  */
  reqId!: number;
  /** Текущее время в кадре */
  time!: number;
  /** Продолжительность забега */
  runningTime!: number;
  /** Текущая скорость */
  currentSpeed!: number;

  /** Счет забега */
  distanceRan!: number;
  /** Число игр */
  playCount!: number;

  distanseChange!: (distanse: number) => void;

  constructor(
    containerId: string,
    distanseChangeFunc: (distanse: number) => void = () => {},
  ) {
    if (Runner._instance) {
      return Runner._instance;
    }
    const containerEl = document.querySelector(containerId) as HTMLElement;
    if (!containerEl) throw new Error("no outerContainerEl");
    this.containerEl = containerEl;
    this.sizes = {
      width: config.view.DEFAULT_WIDTH,
      height: config.view.DEFAULT_HEIGHT,
    };

    this.distanceRan = 0;

    this.distanseChange = distanseChangeFunc;

    this.time = 0;
    this.runningTime = 0;
    this.msPerFrame = 1000 / config.global.FPS;
    this.currentSpeed = 0;

    this.status = {
      started: false,
      activated: false,
      crashed: false,
      paused: false,
    };
    this.playCount = 0;
    Runner._instance = this;
  }

  init() {
    this.setSizes();

    this.currentSpeed = config.global.START_SPEED;

    const canvas = this.containerEl.getElementsByTagName("canvas")[0];
    if (!canvas) throw new Error("no canvas element");
    this.canvas = canvas;

    const canvasCtx = this.canvas.getContext("2d");
    if (!canvasCtx) throw new Error("No canvas context");
    this.canvasCtx = canvasCtx;

    this.canvas.width = this.sizes.width;
    this.canvas.height = this.sizes.height;

    this.canvasCtx.fillStyle = config.view.FILL_COLOR;
    this.canvasCtx.fill();

    this.updateCanvasScaling();

    this.horizon = new Horizon(this.canvasCtx, this.sizes, this.groundPosY());

    this.hero = new Hero(this.canvasCtx, this.groundPosY());
    this.startListening();
    this.update();
  }

  /**
   * Sets the game speed. Adjust the speed accordingly if on a smaller screen.
   * @param {number} opt_speed
   */
  setSpeed(opt_speed?: number) {
    this.currentSpeed = opt_speed || this.currentSpeed;
  }

  /**
   *  Установка размеров игры по размерам родительского контейнера
   */
  setSizes() {
    const boxStyles = window.getComputedStyle(this.containerEl);
    const padding = Number(
      boxStyles.paddingLeft.substr(0, boxStyles.paddingLeft.length - 2),
    );
    this.sizes.height = this.containerEl.offsetHeight;
    this.sizes.width = this.containerEl.offsetWidth - padding * 2;
  }

  /**
   * Update the game status to started.
   */
  startGame() {
    document.documentElement.classList.add("playing");

    this.runningTime = 0;
    this.playCount++;

    document.addEventListener(
      browserEvents.VISIBILITY,
      this.onVisibilityChange.bind(this),
    );

    window.addEventListener(
      browserEvents.BLUR,
      this.onVisibilityChange.bind(this),
    );

    window.addEventListener(
      browserEvents.FOCUS,
      this.onVisibilityChange.bind(this),
    );
  }

  clearCanvas() {
    this.canvasCtx.clearRect(0, 0, this.sizes.width, this.sizes.height);
  }

  /**
   * Update the game frame.
   */
  update() {
    this.drawPending = false;

    const now = getTimeStamp();
    let deltaTime = now - (this.time || now);
    this.time = now;

    if (this.status.activated) {
      this.clearCanvas();

      if (this.hero.jumping) {
        this.hero.updateJump(deltaTime);
      }

      this.runningTime += deltaTime;
      const hasObstacles = this.runningTime > config.global.CLEAR_TIME;

      // First jump triggers the intro.
      if (this.hero.jumpCount === 1) {
        if (!this.status.started && !this.status.crashed) {
          /* this.containerEl.addEventListener(
            browserEvents.ANIM_END,
            this.startGame.bind(this),
          );
          this.containerEl.style.webkitAnimation = "intro .4s ease-out 1 both";
          this.containerEl.style.width = `${this.sizes.width}px`;
          */
          this.startGame();
          this.status.activated = true;
          this.status.started = true;
        } else if (this.status.crashed) {
          this.restart();
        }
      }

      deltaTime = !this.status.started ? 0 : deltaTime;
      this.horizon.update(deltaTime, this.currentSpeed, hasObstacles);

      // Check for collisions.
      const collision =
        hasObstacles &&
        checkForCollision(this.horizon.obstacles[0], this.hero, this.canvasCtx);

      if (!collision) {
        this.distanceRan += (this.currentSpeed * deltaTime) / this.msPerFrame;

        if (this.currentSpeed < config.global.MAX_SPEED) {
          this.currentSpeed += config.global.ACCELERATION;
        }
      } else {
        this.gameOver();
      }

      /* const playAcheivementSound = this.distanceMeter.update(
        deltaTime,
        Math.ceil(this.distanceRan),
      );
       */
    }

    if (!this.status.crashed) {
      this.hero.update(deltaTime);
      this.raq();
    }
  }

  /**
   * Event handler.
   */
  handleEvent(e: Event) {
    const event = e as KeyboardEvent & MouseEvent;
    const f = (evtType: string, events: Record<string, string>): void => {
      switch (evtType) {
        case events.KEYDOWN:
        case events.MOUSEDOWN:
          this.onKeyDown(event);
          break;
        case events.KEYUP:
        case events.MOUSEUP:
          this.onKeyUp(event);
          break;
        default:
          break;
      }
    };
    return f.bind(this)(e.type, browserEvents);
  }

  /**
   * Привязка событий
   */
  startListening() {
    // Keys.
    document.addEventListener(browserEvents.KEYDOWN, this);
    document.addEventListener(browserEvents.KEYUP, this);

    // Mouse.
    document.addEventListener(browserEvents.MOUSEDOWN, this);
    document.addEventListener(browserEvents.MOUSEUP, this);
  }

  /**
   * Удаление привязки событий
   */
  stopListening() {
    document.removeEventListener(browserEvents.KEYDOWN, this);
    document.removeEventListener(browserEvents.KEYUP, this);

    document.removeEventListener(browserEvents.MOUSEDOWN, this);
    document.removeEventListener(browserEvents.MOUSEUP, this);
  }

  /**
   * Событие keydown.
   * @param {Event} e
   */
  onKeyDown(e: KeyboardEvent) {
    if (!this.status.crashed && Runner.keycodes.JUMP[e.code]) {
      if (!this.status.activated) {
        this.status.activated = true;
      }
      if (!this.hero.jumping) {
        this.hero.startJump(this.currentSpeed);
      }
    }
    if (this.status.crashed && e.currentTarget === this.containerEl) {
      this.restart();
    }
    if (
      this.status.activated &&
      !this.status.crashed &&
      Runner.keycodes.DUCK[e.code]
    ) {
      e.preventDefault();
      if (this.hero.jumping) {
        // Speed drop, activated only when jump key is not pressed.
        this.hero.setSpeedDrop();
      }
    }
  }

  /**
   * Событие keyup
   * @param {Event} e
   */
  onKeyUp(e: KeyboardEvent & MouseEvent) {
    const isjumpKey =
      Runner.keycodes.JUMP[e.code] || e.type === browserEvents.MOUSEDOWN;

    if (this.isRunning() && isjumpKey) {
      this.hero.endJump();
    } else if (Runner.keycodes.DUCK[e.code]) {
      this.hero.speedDrop = false;
    } else if (this.status.crashed) {
      if (Runner.keycodes.RESTART[e.code] || Runner.keycodes.JUMP[e.code]) {
        this.restart();
      }
    } else if (this.status.paused && isjumpKey) {
      // Reset the jump state
      this.hero.reset();
      this.play();
    }
  }

  /**
   * RequestAnimationFrame wrapper.
   */
  raq() {
    if (!this.drawPending) {
      this.drawPending = true;
      this.reqId = requestAnimationFrame(this.update.bind(this));
    }
  }

  /**
   * Игра запущена
   * @return {boolean}
   */
  isRunning() {
    return !!this.reqId;
  }

  /**
   * Game over state.
   */
  gameOver() {
    this.stop();
    this.status.crashed = true;
    this.hero.update(100, HeroStatus.CRASHED);

    // Game over panel.
    /* if (!this.gameOverPanel) {
      this.gameOverPanel = new GameOverPanel(
        this.canvas,
        this.spriteDef.TEXT_SPRITE,
        this.spriteDef.RESTART,
        this.sizes,
      );
    } else {
      this.gameOverPanel.draw();
    } */
    this.time = getTimeStamp();
  }

  stop() {
    document.documentElement.classList.remove("playing");
    this.status.activated = false;
    this.status.paused = true;
    cancelAnimationFrame(this.reqId);
    this.reqId = 0;
  }

  /**
   * Старт
   */
  play() {
    document.documentElement.classList.add("playing");

    if (!this.status.crashed) {
      this.status.activated = true;
      this.status.paused = false;
      this.hero.update(0, Hero.status.RUNNING);
      this.time = getTimeStamp();
      this.update();
    }
  }

  /**
   * Рестарт
   */
  restart() {
    document.documentElement.classList.add("playing");

    if (!this.reqId) {
      this.playCount++;
      this.runningTime = 0;
      this.status.activated = true;
      this.status.crashed = false;
      this.distanceRan = 0;
      this.setSpeed(config.global.START_SPEED);

      this.time = getTimeStamp();
      this.clearCanvas();
      // this.distanceMeter.reset(this.highestScore);
      this.horizon.reset();
      this.hero.reset();

      this.update();
    }
  }

  groundPosY = () => this.sizes.height - config.global.GROUND_POS;

  /**
   * Пауза игры если вкладка не активна
   */
  onVisibilityChange(e: Event) {
    if (document.hidden || e.type === "blur") {
      this.stop();
    } else if (!this.status.crashed) {
      this.play();
      this.hero.reset();
    }
  }

  /**
   * Updates the canvas size taking into
   * account the backing store pixel ratio and
   * the device pixel ratio.
   *
   * See article by Paul Lewis:
   * http://www.html5rocks.com/en/tutorials/canvas/hidpi/
   *
   * @param {HTMLCanvasElement} canvas
   * @param {number} opt_width
   * @param {number} opt_height
   * @return {boolean} Whether the canvas was scaled.
   */
  updateCanvasScaling(opt_width?: number, opt_height?: number) {
    const context = this.canvas.getContext("2d") as CanvasRenderingContext2D & {
      webkitBackingStorePixelRatio: number;
    };

    // Query the various pixel ratios
    const devicePixelRatio = Math.floor(window.devicePixelRatio) || 1;
    const backingStoreRatio =
      Math.floor(context.webkitBackingStorePixelRatio) || 1;
    const ratio = devicePixelRatio / backingStoreRatio;

    // Upscale the canvas if the two ratios don't match
    if (devicePixelRatio !== backingStoreRatio) {
      const oldWidth = opt_width || this.canvas.width;
      const oldHeight = opt_height || this.canvas.height;

      this.canvas.width = oldWidth * ratio;
      this.canvas.height = oldHeight * ratio;

      this.canvas.style.width = `${oldWidth}px`;
      this.canvas.style.height = `${oldHeight}px`;

      // Scale the context to counter the fact that we've manually scaled
      // our canvas element.
      // context.scale(ratio, ratio);
      return true;
    }
    if (devicePixelRatio === 1) {
      // Reset the canvas width / height. Fixes scaling bug when the page is
      // zoomed and the devicePixelRatio changes accordingly.
      this.canvas.style.width = `${this.canvas.width}px`;
      this.canvas.style.height = `${this.canvas.height}px`;
    }
    return false;
  }
}
/**
 * Проверка столконовения.
 * @param obstacle Препятствие
 * @param hero Герой.
 * @param opt_canvasCtx Контекст канваса (опционально)
 * @return {Array<CollisionBox>}
 */
export function checkForCollision(
  obstacle: Obstacle,
  hero: Hero,
  opt_canvasCtx: CanvasRenderingContext2D,
) {
  const heroBox = new CollisionBox(
    hero.pos.x + 1,
    hero.pos.y + 1,
    hero.currentAnimFrames[hero.currentFrame].width - 2,
    config.hero.HEIGHT - 2,
  );
  const obstacleBox = new CollisionBox(
    obstacle.xPos + 1,
    obstacle.yPos + 1,
    obstacle.typeConfig.sizes.width,
    obstacle.typeConfig.sizes.height - 2,
  );
  // Отрисовка рамок в режиме отладки
  if (opt_canvasCtx && config.IS_DEBUG) {
    drawCollisionBoxes(opt_canvasCtx, heroBox, obstacleBox);
  }
  if (boxCompare(heroBox, obstacleBox)) {
    const { collisionBoxes } = obstacle;
    const collisionBoxesHero = heroCollisionBoxes[HeroStatus.RUNNING];

    for (let t = 0; t < collisionBoxesHero.length; t++) {
      for (let i = 0; i < collisionBoxes.length; i++) {
        const adjheroBox = createRelativeCollisionBox(
          collisionBoxesHero[t],
          heroBox,
        );
        const adjObstacleBox = createRelativeCollisionBox(
          collisionBoxes[i],
          obstacleBox,
        );
        const crashed = boxCompare(adjheroBox, adjObstacleBox);
        if (opt_canvasCtx && config.IS_DEBUG) {
          drawCollisionBoxes(opt_canvasCtx, adjheroBox, adjObstacleBox);
        }
        if (crashed) {
          return [adjheroBox, adjObstacleBox];
        }
      }
    }
  }
  return false;
}
