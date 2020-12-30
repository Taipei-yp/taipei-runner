import { CollisionBox, FrameSetType, CoordsAndWidth, Coords } from "./models";
import { gameConfig as config, heroConfig } from "./config";

import image from "./assets/hero-sprite.png";

/**
 * Hero game character.
 */
export default class Hero {
  static _imageSprite: CanvasImageSource;

  pos: Coords;
  groundYPos: number;
  currentFrame: number;
  currentAnimFrames: CoordsAndWidth[];
  canvasCtx: CanvasRenderingContext2D;
  timer: number;
  msPerFrame: number;
  jumping: boolean;

  jumpVelocity: number;
  reachedMinHeight: boolean;
  speedDrop: boolean;
  jumpCount: number;
  minJumpHeight: number;
  maxJumpHeight: number;
  status: string;

  constructor(canvasCtx: CanvasRenderingContext2D, groundPos: number) {
    this.canvasCtx = canvasCtx;
    this.pos = { x: 0, y: 0 };
    this.groundYPos = groundPos - heroConfig.HEIGHT;

    this.status = Hero.status.WAITING;
    this.currentFrame = 0;
    this.currentAnimFrames = [];
    this.timer = 0;
    this.msPerFrame = 1000 / config.FPS;

    this.jumping = false;
    this.jumpVelocity = 0;

    this.reachedMinHeight = false;
    this.speedDrop = false;
    this.jumpCount = 0;

    this.minJumpHeight = this.groundYPos - heroConfig.MIN_JUMP_HEIGHT;
    this.maxJumpHeight = this.groundYPos - heroConfig.MAX_JUMP_HEIGHT;

    if (!Hero._imageSprite) {
      const d = document.createElement("img");
      d.src = image;
      Hero._imageSprite = d;
    }
    this.init();
  }

  /**
   * Used in collision detection.
   * @type {Array<CollisionBox>}
   */
  static collisionBoxes = {
    RUNNING: [
      new CollisionBox(22, 0, 17, 16),
      new CollisionBox(1, 18, 30, 9),
      new CollisionBox(10, 35, 14, 8),
      new CollisionBox(1, 24, 29, 5),
      new CollisionBox(5, 30, 21, 4),
      new CollisionBox(9, 34, 15, 4),
    ],
  };

  static status = {
    CRASHED: "CRASHED",
    JUMPING: "JUMPING",
    RUNNING: "RUNNING",
    WAITING: "WAITING",
  };

  /**
   * Animation config for different states.
   */
  static animFrames: Record<string, FrameSetType> = {
    WAITING: {
      frames: [
        { x: 0, y: 77, width: 33 },
        { x: 33, y: 77, width: 31 },
        { x: 64, y: 77, width: 31 },
        { x: 95, y: 77, width: 31 },
      ],
      msPerFrame: 1000 / 3,
    },
    RUNNING: {
      frames: [
        { x: 0, y: 0, width: 63 },
        { x: 63, y: 0, width: 71 },
        { x: 134, y: 0, width: 55 },
        { x: 189, y: 0, width: 40 },
        { x: 229, y: 0, width: 64 },
        { x: 293, y: 0, width: 71 },
        { x: 364, y: 0, width: 54 },
        { x: 424, y: 0, width: 47 },
      ],
      msPerFrame: 1000 / 12,
    },
    CRASHED: {
      frames: [{ x: 126, y: 77, width: 37 }],
      msPerFrame: 1000 / 60,
    },
    JUMPING: {
      frames: [{ x: 163, y: 77, width: 52 }],
      msPerFrame: 1000 / 60,
    },
  };

  init() {
    this.pos.y = this.groundYPos;
    this.pos.x = heroConfig.START_POS_X;
    this.update(0, Hero.status.WAITING);
  }

  /**
   * Set the animation status.
   * @param {!number} deltaTime
   * @param {Hero.status} status Optional status to switch to.
   */
  update(deltaTime: number, opt_status?: string) {
    this.timer += deltaTime;

    // Update the status.
    if (opt_status != null) {
      this.status = opt_status;
      this.currentFrame = 0;
      this.msPerFrame = Hero.animFrames[opt_status].msPerFrame;
      this.currentAnimFrames = Hero.animFrames[opt_status].frames;
    }
    if (this.status === Hero.status.WAITING) {
      this.clearCanvas();
    }
    this.draw(this.currentAnimFrames[this.currentFrame]);

    // Update the frame position.
    if (this.timer >= this.msPerFrame) {
      this.currentFrame =
        this.currentFrame === this.currentAnimFrames.length - 1
          ? 0
          : this.currentFrame + 1;
      this.timer = 0;
    }

    // Speed drop becomes duck if the down key is still being pressed.
    if (this.speedDrop && this.pos.y === this.groundYPos) {
      this.speedDrop = false;
    }
  }

  draw(cw: CoordsAndWidth) {
    this.canvasCtx.drawImage(
      Hero._imageSprite,
      cw.x,
      cw.y,
      cw.width,
      heroConfig.SRC_HEIGHT,
      this.pos.x,
      this.pos.y,
      Math.round(heroConfig.HEIGHT / heroConfig.SRC_HEIGHT) * cw.width,
      heroConfig.HEIGHT,
    );
  }

  clearCanvas() {
    this.canvasCtx.clearRect(
      this.pos.x,
      this.pos.y,
      heroConfig.HEIGHT,
      heroConfig.HEIGHT,
    );
  }

  /**
   * Initialise a jump.
   * @param {number} speed
   */
  startJump(speed: number) {
    if (!this.jumping) {
      this.update(0, Hero.status.JUMPING);
      // Tweak the jump velocity based on the speed.
      this.jumpVelocity = heroConfig.INIITAL_JUMP_VELOCITY - speed / 10;
      this.jumping = true;
      this.reachedMinHeight = false;
      this.speedDrop = false;
    }
  }

  /**
   * Jump is complete, falling down.
   */
  endJump() {
    if (this.reachedMinHeight && this.jumpVelocity < heroConfig.DROP_VELOCITY) {
      this.jumpVelocity = heroConfig.DROP_VELOCITY;
    }
  }

  /**
   * Update frame for a jump.
   * @param {number} deltaTime
   * @param {number} speed // #QT speed: number
   */
  updateJump(deltaTime: number) {
    const framesElapsed = deltaTime / this.msPerFrame;

    // Speed drop makes Hero fall faster.
    if (this.speedDrop) {
      this.pos.y += Math.round(
        this.jumpVelocity * config.SPEED_DROP_COEFFICIENT * framesElapsed,
      );
    } else {
      this.pos.y += Math.round(this.jumpVelocity * framesElapsed);
    }

    this.jumpVelocity += config.GRAVITY * framesElapsed;

    // Minimum height has been reached.
    if (this.pos.y < this.minJumpHeight || this.speedDrop) {
      this.reachedMinHeight = true;
    }

    // Reached max height
    if (this.pos.y < this.maxJumpHeight || this.speedDrop) {
      this.endJump();
    }

    // Back down at ground level. Jump completed.
    if (this.pos.y > this.groundYPos) {
      this.reset();
      this.jumpCount++;
    }
    // #QT
    this.update(deltaTime);
  }

  /**
   * Set the speed drop. Immediately cancels the current jump.
   */
  setSpeedDrop() {
    this.speedDrop = true;
    this.jumpVelocity = 1;
  }

  /**
   * Reset the Hero to running at start of game.
   */
  reset() {
    this.pos.y = this.groundYPos;
    this.jumpVelocity = 0;
    this.jumping = false;
    this.update(0, Hero.status.RUNNING);
    this.speedDrop = false;
    this.jumpCount = 0;
  }
}
