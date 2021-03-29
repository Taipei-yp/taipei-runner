import image from "./assets/hero-sprite.png";
import { gameConfig as config } from "./config";
import { CollisionBox, Coords, CoordsAndWidth, FrameSetType } from "./models";

/** Состояние героя */
export enum HeroStatus {
  CRASHED,
  JUMPING,
  RUNNING,
  WAITING,
}

/** Наборы фреймов для состояний героя */
const heroFrames: Record<HeroStatus, FrameSetType> = {
  [HeroStatus.WAITING]: {
    frames: [
      { x: 0, y: 77, width: 33 },
      { x: 33, y: 77, width: 31 },
      { x: 64, y: 77, width: 31 },
      { x: 95, y: 77, width: 31 },
    ],
    msPerFrame: 1000 / 3,
  },
  [HeroStatus.RUNNING]: {
    frames: [
      { x: 0, y: 0, width: 63 },
      { x: 64, y: 0, width: 70 },
      { x: 135, y: 0, width: 54 },
      { x: 190, y: 0, width: 39 },
      { x: 230, y: 0, width: 63 },
      { x: 294, y: 0, width: 70 },
      { x: 365, y: 0, width: 53 },
      { x: 425, y: 0, width: 46 },
    ],
    msPerFrame: 1000 / 12,
  },
  [HeroStatus.CRASHED]: {
    frames: [{ x: 126, y: 77, width: 37 }],
    msPerFrame: 1000 / 1,
  },
  [HeroStatus.JUMPING]: {
    frames: [{ x: 163, y: 77, width: 52 }],
    msPerFrame: 1000 / 60,
  },
};

/** Области пересечений для состояний героя */
export const heroCollisionBoxes = {
  [HeroStatus.RUNNING]: [new CollisionBox(-20, 0, 20, 77)],
  [HeroStatus.JUMPING]: [
    new CollisionBox(-21, 28, 23, 11),
    new CollisionBox(-26, -19, 7, 15),
    new CollisionBox(-40, -17, 14, 17),
  ],
  [HeroStatus.CRASHED]: [],
  [HeroStatus.WAITING]: [],
};

/**
 * Герой
 */
export default class Hero {
  /** Спрайт */
  static _imageSprite: CanvasImageSource;
  /** Контекст канваса */
  canvasCtx: CanvasRenderingContext2D;
  /** Координата Y положения персонажа на земле */
  yPosGround: number;
  /** Минимальная высота прыжка */
  minJumpHeight: number;
  /** Максимальная высота прыжка */
  maxJumpHeight: number;
  /** Состояние */
  status: HeroStatus;
  /** Позиция героя для отрисовки */
  pos: Coords;
  /** Номер кадра для отрисовки */
  currentFrame: number;
  /** Текущий набор кадров для отрисовки */
  currentAnimFrames: CoordsAndWidth[];
  /** Время отрисовки одного кадра */
  msPerFrame: number;
  /** Таймер для изменения кадров */
  changeFrameTimer: number;
  /** Флаг - герой в прыжке */
  jumping: boolean;
  /** Сокрость прыжка */
  jumpVelocity: number;
  /** Достигнута минимальная высота прыжка */
  reachedMinHeight: boolean;
  /** Кол-во прыжков */
  jumpCount: number;

  constructor(canvasCtx: CanvasRenderingContext2D, groundPos: number) {
    this.canvasCtx = canvasCtx;
    this.yPosGround = groundPos - config.hero.HEIGHT;
    this.minJumpHeight = this.yPosGround - config.hero.MIN_JUMP_HEIGHT;
    this.maxJumpHeight = this.yPosGround - config.hero.MAX_JUMP_HEIGHT;
    this.status = HeroStatus.WAITING;
    this.pos = { x: 0, y: 0 };
    this.currentFrame = 0;
    this.currentAnimFrames = [];
    this.msPerFrame = 1000 / config.global.FPS;
    this.changeFrameTimer = 0;
    this.jumping = false;
    this.jumpVelocity = 0;
    this.jumpCount = 0;
    this.reachedMinHeight = false;

    if (!Hero._imageSprite) {
      const d = document.createElement("img");
      d.src = image;
      Hero._imageSprite = d;
    }
    this.init();
  }

  /** Инициализация */
  init() {
    this.pos.y = this.yPosGround;
    this.pos.x = config.hero.START_POS_X;
    this.update(0, HeroStatus.WAITING);
  }
  /**
   * Обновление
   */
  update(deltaTime: number, newStatus?: HeroStatus) {
    this.changeFrameTimer += deltaTime;
    if (newStatus != null) {
      this.updateStatus(newStatus);
    }
    if (this.status === HeroStatus.WAITING) {
      this.clearCanvas();
    }
    // Изменяем положение по оси х что бы отрисовка происходила относительно правого края
    this.pos.x =
      config.hero.START_POS_X -
      Hero.drawWidth(this.currentAnimFrames[this.currentFrame].width);
    this.draw(this.currentAnimFrames[this.currentFrame]);
    // Обновление кадра для отрисовки
    if (this.changeFrameTimer >= this.msPerFrame) {
      this.currentFrame =
        this.currentFrame === this.currentAnimFrames.length - 1
          ? 0
          : this.currentFrame + 1;
      this.changeFrameTimer = 0;
    }
  }

  updateStatus(newStatus: HeroStatus) {
    this.status = newStatus;
    this.currentFrame = 0;
    this.msPerFrame = heroFrames[newStatus].msPerFrame;
    this.currentAnimFrames = heroFrames[newStatus].frames;
  }

  /**
   * Сброс в состояние бега
   */
  reset() {
    this.pos.y = this.yPosGround;
    this.jumping = false;
    this.jumpVelocity = 0;
    // this.jumpCount = 0;
    this.updateStatus(HeroStatus.RUNNING);
  }
  /** Отрисовка */
  draw(cw: CoordsAndWidth) {
    this.canvasCtx.drawImage(
      Hero._imageSprite,
      cw.x,
      cw.y,
      cw.width,
      config.hero.SRC_HEIGHT,
      this.pos.x,
      this.pos.y,
      Hero.drawWidth(cw.width),
      config.hero.HEIGHT,
    );
  }
  /** Стирание области под моделью героя */
  clearCanvas() {
    this.canvasCtx.clearRect(
      this.pos.x,
      this.pos.y,
      Hero.drawWidth(this.currentAnimFrames[this.currentFrame].width),
      config.hero.HEIGHT,
    );
  }
  /**
   * Начало прыжка
   */
  startJump(speed: number) {
    if (!this.jumping) {
      this.update(0, HeroStatus.JUMPING);
      this.jumping = true;
      this.jumpVelocity = config.hero.INITIAL_JUMP_VELOCITY - speed / 10;
      this.reachedMinHeight = false;
    }
  }
  /**
   * Прыжек закончен, спуск вниз
   */
  endJump() {
    if (
      this.reachedMinHeight &&
      this.jumpVelocity < config.hero.DROP_VELOCITY
    ) {
      this.jumpVelocity = config.hero.DROP_VELOCITY;
    }
  }
  /**
   * Обновление кадра прыжка
   */
  updateJump(deltaTime: number) {
    const framesElapsed = deltaTime / this.msPerFrame;

    this.pos.y += Math.round(this.jumpVelocity * framesElapsed);
    this.jumpVelocity += config.hero.GRAVITY * framesElapsed;

    // Достигнута минимальная высота прыжка
    if (this.pos.y < this.minJumpHeight) {
      this.reachedMinHeight = true;
    }
    // Достигнута максимальная высота прыжка
    if (this.pos.y < this.maxJumpHeight) {
      this.endJump();
    }
    // Возвражение на земплю. Прыжок завершен
    if (this.pos.y > this.yPosGround) {
      this.reset();
      this.jumpCount++;
    }
    // this.update(deltaTime);
  }
  /** Ширина героя при отрисовке */
  static drawWidth(width: number) {
    return Math.round(config.hero.HEIGHT / config.hero.SRC_HEIGHT) * width;
  }
  static scaleCf() {
    return Math.round(config.hero.HEIGHT / config.hero.SRC_HEIGHT);
  }
}
