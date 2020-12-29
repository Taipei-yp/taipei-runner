import { Dimensions, CollisionBox, Coords } from "./models";
import {
  getTimeStamp,
  drawCollisionBoxes,
  createAdjustedCollisionBox,
  boxCompare,
} from "./utils";
import Hero from "./hero";
import Horizon from "./horizon";
import Obstacle from "./obstacle";
import { gameConfig as config } from "./config";
// #QT window["Runner"] = Runner;

/**
 * Runner.
 * @param {string} outerContainerId Outer containing element id.
 * @constructor
 * @export
 */
export default class Runner {
  /**
   * CSS class names.
   * @enum {string}
   */
  static classes = {
    CANVAS: "runner-canvas",
    CONTAINER: "runner-container",
    CRASHED: "crashed",
    ICON: "icon-offline",
    SNACKBAR: "snackbar",
    SNACKBAR_SHOW: "snackbar-show",
    TOUCH_CONTROLLER: "controller",
  };

  /**
   * Key code mapping.
   * @enum {Object}
   */
  static keycodes = {
    JUMP: { "38": 1, "32": 1 } as Record<string, number>, // Up, spacebar
    DUCK: { "40": 1 } as Record<string, number>, // Down
    RESTART: { "13": 1 } as Record<string, number>, // Enter
  };

  /**
   * Runner event names.
   * @enum {string}
   */
  static events = {
    ANIM_END: "webkitAnimationEnd",
    CLICK: "click",
    KEYDOWN: "keydown",
    KEYUP: "keyup",
    MOUSEDOWN: "mousedown",
    MOUSEUP: "mouseup",
    RESIZE: "resize",
    TOUCHEND: "touchend",
    TOUCHSTART: "touchstart",
    VISIBILITY: "visibilitychange",
    BLUR: "blur",
    FOCUS: "focus",
    LOAD: "load",
  };

  static _instance: Runner;
  // outerContainerEl!: HTMLElement;
  containerEl!: HTMLElement;
  dimensions!: Dimensions;
  canvas!: HTMLCanvasElement;
  canvasCtx!: CanvasRenderingContext2D;
  hero!: Hero;
  distanceMeter: null;
  distanceRan!: number;
  highestScore!: number;
  time!: number;
  runningTime!: number;
  msPerFrame!: number;
  currentSpeed!: number;
  obstacles!: never[];
  started!: boolean;
  activated!: boolean;
  crashed!: boolean;
  paused!: boolean;
  resizeTimerId_!: number;
  playCount!: number;
  // images!: {};
  // imagesLoaded!: number;
  static imageSprite: CanvasImageSource;
  config!: Record<string, string | number>;
  playingIntro!: boolean;
  horizon!: Horizon;
  spriteDef!: Record<string, Coords>;
  drawPending!: boolean;
  raqId!: number;

  constructor(containerId: string) {
    // Singleton

    if (Runner._instance) {
      return Runner._instance;
    }
    const containerEl = document.querySelector(containerId) as HTMLElement;
    if (!containerEl) throw new Error("no outerContainerEl");
    this.containerEl = containerEl;

    this.dimensions = {
      width: config.DEFAULT_WIDTH,
      height: config.DEFAULT_HEIGHT,
    };

    this.distanceMeter = null;
    this.distanceRan = 0;

    this.highestScore = 0;

    this.time = 0;
    this.runningTime = 0;
    this.msPerFrame = 1000 / config.FPS;
    this.currentSpeed = config.SPEED;

    this.obstacles = [];

    this.started = false;
    this.activated = false;
    this.crashed = false;
    this.paused = false;

    this.playCount = 0;

    // Images.
    // this.images = {};
    // this.imagesLoaded = 0;

    // if (this.isDisabled()) {
    //   this.setupDisabledRunner();
    // } else {
    // this.loadImages();
    // }

    Runner._instance = this;
  }

  /**
   * Game initialiser.
   */
  init() {
    // Hide the static icon.
    // document.querySelector('.' + Runner.classes.ICON).style.visibility =
    //     'hidden';

    this.adjustDimensions();
    this.setSpeed();

    const canvas = this.containerEl.getElementsByTagName("canvas")[0];
    if (!canvas) throw new Error("no canvas element");
    this.canvas = canvas;

    const canvasCtx = this.canvas.getContext("2d");
    if (!canvasCtx) throw new Error("No canvas context");
    this.canvasCtx = canvasCtx;

    this.canvas.width = this.dimensions.width;
    this.canvas.height = this.dimensions.height;

    this.canvasCtx.fillStyle = config.FILL_COLOR;
    this.canvasCtx.fill();

    this.updateCanvasScaling();

    // Horizon contains obstacles and the ground.
    this.horizon = new Horizon(
      this.canvasCtx,
      this.dimensions,
      config.GAP_COEFFICIENT,
    );

    // Distance meter
    /* this.distanceMeter = new DistanceMeter(
      this.canvas,
      this.spriteDef.TEXT_SPRITE,
      this.dimensions.width,
    ); */

    // Draw hero
    this.hero = new Hero(this.canvasCtx);

    this.startListening();
    this.update();

    window.addEventListener(
      Runner.events.RESIZE,
      this.debounceResize.bind(this),
    );
  }

  /**
   * Sets the game speed. Adjust the speed accordingly if on a smaller screen.
   * @param {number} opt_speed
   */
  setSpeed(opt_speed?: number) {
    this.currentSpeed = opt_speed || this.currentSpeed;
  }

  /**
   * Debounce the resize event.
   */
  debounceResize() {
    if (!this.resizeTimerId_) {
      this.resizeTimerId_ = window.setInterval(
        this.adjustDimensions.bind(this),
        250,
      );
    }
  }

  /**
   * Adjust game space dimensions on resize.
   */
  adjustDimensions() {
    window.clearInterval(this.resizeTimerId_);
    this.resizeTimerId_ = 0;

    const boxStyles = window.getComputedStyle(this.containerEl); // --outerContainerEl
    const padding = Number(
      boxStyles.paddingLeft.substr(0, boxStyles.paddingLeft.length - 2),
    );
    this.dimensions.height = this.containerEl.offsetHeight;
    this.dimensions.width = this.containerEl.offsetWidth - padding * 2;

    // Redraw the elements back onto the canvas.
    if (this.canvas) {
      this.canvas.width = this.dimensions.width;
      this.canvas.height = this.dimensions.height;

      this.updateCanvasScaling();

      // this.distanceMeter.calcXPos(this.dimensions.width);
      this.clearCanvas();
      this.horizon.update(0, 0, true);
      this.hero.update(0);

      // Outer container and distance meter.
      if (this.activated || this.crashed || this.paused) {
        // this.containerEl.style.width = `${this.dimensions.width}px`;
        // this.containerEl.style.height = `${this.dimensions.height}px`;
        // this.distanceMeter.update(0, Math.ceil(this.distanceRan));
        this.stop();
      } else {
        this.hero.draw(0, 0);
      }
    }
  }

  /**
   * Play the game intro.
   * Canvas container width expands out to the full width.
   */
  playIntro() {
    if (!this.started && !this.crashed) {
      this.playingIntro = true;
      this.hero.playingIntro = true;

      // CSS animation definition.
      const keyframes =
        `${`@-webkit-keyframes intro { from { width:`}${
          this.hero.config.width
        }px }` +
        `to { width: ${this.dimensions.width}px }` +
        `}`;

      try {
        document.styleSheets[0].insertRule(keyframes, 0);
      } catch (error) {
        this.startGame();
      }

      this.containerEl.addEventListener(
        Runner.events.ANIM_END,
        this.startGame.bind(this),
      );

      this.containerEl.style.webkitAnimation = "intro .4s ease-out 1 both";
      this.containerEl.style.width = `${this.dimensions.width}px`;

      this.activated = true;
      this.started = true;
    } else if (this.crashed) {
      this.restart();
    }
  }

  /**
   * Update the game status to started.
   */
  startGame() {
    document.documentElement.classList.add("playing");

    this.runningTime = 0;
    this.playingIntro = false;
    this.hero.playingIntro = false;
    this.containerEl.style.webkitAnimation = "";
    this.playCount++;

    // Handle tabbing off the page. Pause the current game.
    document.addEventListener(
      Runner.events.VISIBILITY,
      this.onVisibilityChange.bind(this),
    );

    window.addEventListener(
      Runner.events.BLUR,
      this.onVisibilityChange.bind(this),
    );

    window.addEventListener(
      Runner.events.FOCUS,
      this.onVisibilityChange.bind(this),
    );
  }

  clearCanvas() {
    this.canvasCtx.clearRect(
      0,
      0,
      this.dimensions.width,
      this.dimensions.height,
    );
  }

  /**
   * Update the game frame.
   */
  update() {
    this.drawPending = false;

    const now = getTimeStamp();
    let deltaTime = now - (this.time || now);
    this.time = now;

    if (this.activated) {
      this.clearCanvas();

      if (this.hero.jumping) {
        this.hero.updateJump(deltaTime);
      }

      this.runningTime += deltaTime;
      const hasObstacles = this.runningTime > this.config.CLEAR_TIME;

      // First jump triggers the intro.
      if (this.hero.jumpCount === 1 && !this.playingIntro) {
        this.playIntro();
      }

      // The horizon doesn't move until the intro is over.
      if (this.playingIntro) {
        this.horizon.update(0, this.currentSpeed, hasObstacles);
      } else {
        deltaTime = !this.started ? 0 : deltaTime;
        this.horizon.update(deltaTime, this.currentSpeed, hasObstacles);
      }

      // Check for collisions.
      const collision =
        hasObstacles &&
        checkForCollision(this.horizon.obstacles[0], this.hero, this.canvasCtx);

      if (!collision) {
        this.distanceRan += (this.currentSpeed * deltaTime) / this.msPerFrame;

        if (this.currentSpeed < this.config.MAX_SPEED) {
          this.currentSpeed += this.config.ACCELERATION as number;
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

    if (!this.crashed) {
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
        case events.TOUCHSTART:
        case events.MOUSEDOWN:
        case events.GAMEPADCONNECTED:
          this.onKeyDown(event);
          break;
        case events.KEYUP:
        case events.TOUCHEND:
        case events.MOUSEUP:
          this.onKeyUp(event);
          break;
        default:
          break;
      }
    };
    return f.bind(this)(e.type, Runner.events);
  }

  /**
   * Bind relevant key / mouse / touch listeners.
   */
  startListening() {
    // Keys.
    document.addEventListener(Runner.events.KEYDOWN, this);
    document.addEventListener(Runner.events.KEYUP, this);

    // Mouse.
    document.addEventListener(Runner.events.MOUSEDOWN, this);
    document.addEventListener(Runner.events.MOUSEUP, this);
  }

  /**
   * Remove all listeners.
   */
  stopListening() {
    document.removeEventListener(Runner.events.KEYDOWN, this);
    document.removeEventListener(Runner.events.KEYUP, this);

    document.removeEventListener(Runner.events.MOUSEDOWN, this);
    document.removeEventListener(Runner.events.MOUSEUP, this);
  }

  /**
   * Process keydown.
   * @param {Event} e
   */
  onKeyDown(e: KeyboardEvent) {
    // if (e.target != this.detailsButton) {
    if (
      !this.crashed &&
      (Runner.keycodes.JUMP[e.code] || e.type === Runner.events.TOUCHSTART)
    ) {
      if (!this.activated) {
        this.activated = true;
        // errorPageController.trackEasterEgg();
      }

      if (!this.hero.jumping && !this.hero.ducking) {
        this.hero.startJump(this.currentSpeed);
      }
    }

    if (
      this.crashed &&
      e.type === Runner.events.TOUCHSTART &&
      e.currentTarget === this.containerEl
    ) {
      this.restart();
    }
    // }

    if (this.activated && !this.crashed && Runner.keycodes.DUCK[e.keyCode]) {
      e.preventDefault();
      if (this.hero.jumping) {
        // Speed drop, activated only when jump key is not pressed.
        this.hero.setSpeedDrop();
      } else if (!this.hero.jumping && !this.hero.ducking) {
        // Duck.
        this.hero.setDuck(true);
      }
    }
  }

  /**
   * Process key up.
   * @param {Event} e
   */
  onKeyUp(e: KeyboardEvent & MouseEvent) {
    const keyCode = String(e.code);
    const isjumpKey =
      Runner.keycodes.JUMP[keyCode] ||
      e.type === Runner.events.TOUCHEND ||
      e.type === Runner.events.MOUSEDOWN;

    if (this.isRunning() && isjumpKey) {
      this.hero.endJump();
    } else if (Runner.keycodes.DUCK[keyCode]) {
      this.hero.speedDrop = false;
      this.hero.setDuck(false);
    } else if (this.crashed) {
      // Check that enough time has elapsed before allowing jump key to restart.
      const deltaTime = getTimeStamp() - this.time;
      if (
        Runner.keycodes.RESTART[keyCode] ||
        this.isLeftClickOnCanvas(e) ||
        (deltaTime >= this.config.GAMEOVER_CLEAR_TIME &&
          Runner.keycodes.JUMP[keyCode])
      ) {
        this.restart();
      }
    } else if (this.paused && isjumpKey) {
      // Reset the jump state
      this.hero.reset();
      this.play();
    }
  }

  /**
   * Returns whether the event was a left click on canvas.
   * On Windows right click is registered as a click.
   * @param {Event} e
   * @return {boolean}
   */
  isLeftClickOnCanvas(e: MouseEvent): boolean {
    return (
      e.button != null &&
      e.button < 2 &&
      e.type === Runner.events.MOUSEUP &&
      e.target === this.canvas
    );
  }

  /**
   * RequestAnimationFrame wrapper.
   */
  raq() {
    if (!this.drawPending) {
      this.drawPending = true;
      this.raqId = requestAnimationFrame(this.update.bind(this));
    }
  }

  /**
   * Whether the game is running.
   * @return {boolean}
   */
  isRunning() {
    return !!this.raqId;
  }

  /**
   * Game over state.
   */
  gameOver() {
    this.stop();
    this.crashed = true;
    // this.distanceMeter.acheivement = false;

    this.hero.update(100, Hero.status.CRASHED);

    // Game over panel.
    /* if (!this.gameOverPanel) {
      this.gameOverPanel = new GameOverPanel(
        this.canvas,
        this.spriteDef.TEXT_SPRITE,
        this.spriteDef.RESTART,
        this.dimensions,
      );
    } else {
      this.gameOverPanel.draw();
    } */

    // Update the high score.
    if (this.distanceRan > this.highestScore) {
      this.highestScore = Math.ceil(this.distanceRan);
      // this.distanceMeter.setHighScore(this.highestScore);
    }

    // Reset the time clock.
    this.time = getTimeStamp();
  }

  stop() {
    document.documentElement.classList.remove("playing");

    this.activated = false;
    this.paused = true;
    cancelAnimationFrame(this.raqId);
    this.raqId = 0;
  }

  play() {
    document.documentElement.classList.add("playing");

    if (!this.crashed) {
      this.activated = true;
      this.paused = false;
      this.hero.update(0, Hero.status.RUNNING);
      this.time = getTimeStamp();
      this.update();
    }
  }

  restart() {
    document.documentElement.classList.add("playing");

    if (!this.raqId) {
      this.playCount++;
      this.runningTime = 0;
      this.activated = true;
      this.crashed = false;
      this.distanceRan = 0;
      this.setSpeed(this.config.SPEED as number);

      this.time = getTimeStamp();
      this.containerEl.classList.remove(Runner.classes.CRASHED);
      this.clearCanvas();
      // this.distanceMeter.reset(this.highestScore);
      this.horizon.reset();
      this.hero.reset();

      this.update();
    }
  }

  /**
   * Pause the game if the tab is not in focus.
   */
  onVisibilityChange(e: Event) {
    if (document.hidden || e.type === "blur") {
      this.stop();
    } else if (!this.crashed) {
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
 * Check for a collision.
 * @param {!Obstacle} obstacle
 * @param {!hero} hero T-rex object.
 * @param {HTMLCanvasContext} opt_canvasCtx Optional canvas context for drawing
 *    collision boxes.
 * @return {Array<CollisionBox>}
 */
export function checkForCollision(
  obstacle: Obstacle,
  hero: Hero,
  opt_canvasCtx: CanvasRenderingContext2D,
) {
  // const obstacleBoxXPos = Runner.defaultDimensions.width + obstacle.xPos;

  // Adjustments are made to the bounding box as there is a 1 pixel white
  // border around the t-rex and obstacles.
  const heroBox = new CollisionBox(
    hero.xPos + 1,
    hero.yPos + 1,
    hero.config.width - 2,
    hero.config.HEIGHT - 2,
  );

  const obstacleBox = new CollisionBox(
    obstacle.xPos + 1,
    obstacle.yPos + 1,
    obstacle.typeConfig.dimensions.width,
    obstacle.typeConfig.dimensions.height - 2,
  );

  // Debug outer box
  if (opt_canvasCtx) {
    drawCollisionBoxes(opt_canvasCtx, heroBox, obstacleBox);
  }

  // Simple outer bounds check.
  if (boxCompare(heroBox, obstacleBox)) {
    const { collisionBoxes } = obstacle;
    const heroCollisionBoxes = hero.ducking
      ? Hero.collisionBoxes.DUCKING
      : Hero.collisionBoxes.RUNNING;

    // Detailed axis aligned box check.
    for (let t = 0; t < heroCollisionBoxes.length; t++) {
      for (let i = 0; i < collisionBoxes.length; i++) {
        // Adjust the box to actual positions.
        const adjheroBox = createAdjustedCollisionBox(
          heroCollisionBoxes[t],
          heroBox,
        );
        const adjObstacleBox = createAdjustedCollisionBox(
          collisionBoxes[i],
          obstacleBox,
        );
        const crashed = boxCompare(adjheroBox, adjObstacleBox);

        // Draw boxes for debug.
        if (opt_canvasCtx) {
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
