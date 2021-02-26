import GameAudio, { SoundAction } from "./audio";
import { gameConfig as config } from "./config";
import Hero, { heroCollisionBoxes, HeroStatus } from "./hero";
import Horizon from "./horizon";
import { CollisionBox, Sizes } from "./models";
import Obstacle from "./obstacle";
import {
  boxCompare,
  createRelativeCollisionBox,
  drawCollisionBoxes,
  getTimeStamp,
} from "./utils";

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
  GAMEPADCONNECTED: "gamepadconnected",
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
  /** Экземпляр игры */
  static _instance: Runner;
  /** Селектор контейнера */
  containerId!: string;
  /** Контейнер */
  containerEl!: HTMLElement;
  /** Канвас */
  canvas!: HTMLCanvasElement;
  /** Контекст канваса */
  canvasCtx!: CanvasRenderingContext2D;
  /** Размеры канваса */
  sizes!: Sizes;
  /** Объект героя */
  hero!: Hero;
  /** Объект фона */
  horizon!: Horizon;
  /** Статусы  */
  status!: {
    started: boolean;
    activated: boolean;
    crashed: boolean;
    paused: boolean;
  };
  /** Время на один кадр */
  msPerFrame!: number;
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
  /** Флаг выбора события нажатия кнопки гейпада */
  gamepadPreviousKeyDown!: boolean;

  printScore!: (distance: number) => void;
  gameOverFunc!: (score: number) => void;
  gameRunning!: (running: boolean) => void;

  gameAudio!: GameAudio;

  constructor(
    containerId: string,
    printScoreFunc: (distance: number) => void = () => {},
    gameRunning: (running: boolean) => void = () => {},
    gameOverFunc: (score: number) => void = () => {},
  ) {
    this.containerId = containerId;
    this.sizes = {
      width: config.view.DEFAULT_WIDTH,
      height: config.view.DEFAULT_HEIGHT,
    };

    this.distanceRan = 0;

    this.printScore = printScoreFunc;
    this.gameOverFunc = gameOverFunc;
    this.gameRunning = gameRunning;

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
    this.gameAudio = new GameAudio();
  }

  /** Инициализация */
  init() {
    const containerEl = document.querySelector(this.containerId) as HTMLElement;
    if (!containerEl) throw new Error("no outerContainerEl");
    this.containerEl = containerEl;

    const canvas = this.containerEl.getElementsByTagName("canvas")[0];
    if (!canvas) throw new Error("no canvas element");
    this.canvas = canvas;

    const canvasCtx = this.canvas.getContext("2d");
    if (!canvasCtx) throw new Error("No canvas context");
    this.canvasCtx = canvasCtx;

    // this.canvas.classList.add("hidden");
    this.setSizes();
    // this.canvas.classList.remove("hidden");
    this.currentSpeed = config.global.START_SPEED;

    this.canvas.width = this.sizes.width;
    this.canvas.height = this.sizes.height;
    this.canvasCtx.fillStyle = config.view.FILL_COLOR;
    this.canvasCtx.fill();

    // this.updateCanvasScaling();

    this.horizon = new Horizon(this.canvasCtx, this.sizes, this.groundPosY());
    this.hero = new Hero(this.canvasCtx, this.groundPosY());

    this.gameAudio.init();
    this.gameAudio.playBgSound();

    this.startListening();
    this.update();
  }

  /**
   * Обновление кадра игры
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

      // Первый прыжок старт игры или рестарт
      if (this.hero.jumpCount === 1) {
        this.gameAudio.canPlaySound();
        if (!this.status.started && !this.status.crashed) {
          this.startGame();
          this.status.activated = true;
          this.status.started = true;
        } else if (this.status.crashed) {
          this.restart();
        }
      }

      deltaTime = !this.status.started ? 0 : deltaTime;
      this.horizon.update(deltaTime, this.currentSpeed, hasObstacles);

      // Есть ли пересечение областей
      const collision =
        hasObstacles &&
        checkForCollision(this.horizon.obstacles[0], this.hero, this.canvasCtx);

      if (!collision) {
        this.distanceRan += (this.currentSpeed * deltaTime) / this.msPerFrame;

        if (this.currentSpeed < config.global.MAX_SPEED) {
          this.currentSpeed += config.global.ACCELERATION;
        }
      } else {
        this.endGame();
      }
      this.setRunScore(this.distanceRan);
    }
    if (!this.status.crashed) {
      this.hero.update(deltaTime);
      this.raq();
    }
  }

  /**
   * Начало игры
   */
  startGame() {
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
    this.gameRunning(true);
  }

  /**
   * Конец игры
   */
  endGame() {
    this.stop();
    this.status.crashed = true;
    this.hero.update(100, HeroStatus.CRASHED);
    this.time = getTimeStamp();
    this.gameAudio.stopBgSound();
    this.gameAudio.actionSound(SoundAction.GAMEOVER);
    this.gameRunning(false);
    this.gameOverFunc(this.convertDistanceToScore(this.distanceRan));
  }

  /**
   * Запуск забега
   */
  play() {
    if (!this.status.crashed) {
      this.status.activated = true;
      this.status.paused = false;
      this.hero.update(0, HeroStatus.RUNNING);
      this.time = getTimeStamp();
      this.gameAudio.playBgSound();
      this.update();
      this.gameRunning(true);
    }
  }

  /** Остановка забега */
  stop() {
    this.status.activated = false;
    this.status.paused = true;
    cancelAnimationFrame(this.reqId);
    this.reqId = 0;
    this.gameAudio.stopBgSound();
    this.gameRunning(false);
  }

  /**
   * Рестарт игры
   */
  restart() {
    if (!this.reqId) {
      this.playCount++;
      this.runningTime = 0;
      this.status.activated = true;
      this.status.crashed = false;
      this.distanceRan = 0;
      this.setRunScore(this.distanceRan);
      this.setSpeed(config.global.START_SPEED);
      this.time = getTimeStamp();
      this.clearCanvas();
      this.horizon.reset();
      this.hero.reset();
      this.update();
      this.gameAudio.playBgSound();
      this.gameRunning(true);
    }
  }

  /**
   * Событие keydown.
   */
  onKeyDown(e: KeyboardEvent) {
    if (
      !this.status.crashed &&
      (Runner.keycodes.JUMP[e.code] ||
        e.type === browserEvents.GAMEPADCONNECTED)
    ) {
      if (!this.status.activated) {
        this.status.activated = true;
      }
      if (!this.hero.jumping) {
        this.hero.startJump(this.currentSpeed);
        this.gameAudio.actionSound(SoundAction.JUMP);
      }
    }
    if (this.status.crashed && e.currentTarget === this.containerEl) {
      this.restart();
    }
  }

  /**
   * Событие keyup
   */
  onKeyUp(e: KeyboardEvent & MouseEvent) {
    const isjumpKey =
      Runner.keycodes.JUMP[e.code] || e.type === browserEvents.MOUSEDOWN;

    if (this.isRunning() && isjumpKey) {
      this.hero.endJump();
    } else if (this.status.crashed) {
      if (Runner.keycodes.RESTART[e.code] || Runner.keycodes.JUMP[e.code]) {
        this.restart();
      }
    } else if (this.status.paused && isjumpKey) {
      this.hero.reset();
      this.play();
    }
  }

  /**
   * Обработчик событий.
   */
  handleEvent(e: Event) {
    const event = e as KeyboardEvent & MouseEvent;
    const f = (evtType: string, events: typeof browserEvents): void => {
      switch (evtType) {
        case events.KEYDOWN:
        case events.MOUSEDOWN:
        case events.GAMEPADCONNECTED:
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
    document.addEventListener(browserEvents.KEYDOWN, this);
    document.addEventListener(browserEvents.KEYUP, this);
    document.addEventListener(browserEvents.MOUSEDOWN, this);
    document.addEventListener(browserEvents.MOUSEUP, this);
    window.addEventListener(browserEvents.GAMEPADCONNECTED, this);

    if (
      Object.values(navigator.getGamepads()).filter(g => g !== null).length > 0
    ) {
      window.setInterval(this.pollGamepads.bind(this), 10);
    }
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

  /** Преобразование событий ввода геймпада в события keydown/up (пробел) */
  pollGamepads() {
    const gamepads = navigator.getGamepads();
    let keydown = false;
    for (let i = 0; i < gamepads.length; i++) {
      const gamepad = gamepads[i];
      if (gamepad != null) {
        if (gamepad.buttons.some(e => e.pressed === true)) {
          keydown = true;
        }
      }
    }
    if (keydown !== this.gamepadPreviousKeyDown) {
      this.gamepadPreviousKeyDown = keydown;
      const event = new KeyboardEvent(keydown ? "keydown" : "keyup", {
        code: "Space",
        altKey: false,
        ctrlKey: true,
        shiftKey: false,
        metaKey: false,
      });
      document.dispatchEvent(event);
    }
  }

  /**
   * Пауза игры если вкладка не активна
   */
  onVisibilityChange(e: Event) {
    if (document.hidden || e.type === "blur") {
      this.stop();
    } else if (!this.status.crashed && this.status.paused) {
      this.play();
      this.hero.reset();
    }
  }

  /**
   * Обертка для RequestAnimationFrame.
   */
  raq() {
    if (!this.drawPending) {
      this.drawPending = true;
      this.reqId = requestAnimationFrame(this.update.bind(this));
    }
  }

  /**
   * Игра запущена
   */
  isRunning() {
    return !!this.reqId;
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
   * Установка скорости игры
   */
  setSpeed(opt_speed?: number) {
    this.currentSpeed = opt_speed || this.currentSpeed;
  }

  /** Очистка канваса */
  clearCanvas() {
    this.canvasCtx.clearRect(0, 0, this.sizes.width, this.sizes.height);
  }

  /** Y координата земли */
  groundPosY = () => this.sizes.height - config.global.GROUND_POS;

  setRunScore(distance: number) {
    const score = this.convertDistanceToScore(distance);
    this.printScore(score);
  }

  convertDistanceToScore(distance: number) {
    return Math.round(distance * config.global.SCORE_COEFFICIENT);
  }

  close() {
    this.endGame();
    this.stopListening();
    this.gameAudio.close();
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
    Hero.drawWidth(hero.currentAnimFrames[hero.currentFrame].width) - 2,
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
