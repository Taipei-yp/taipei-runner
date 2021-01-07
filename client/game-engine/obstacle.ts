import { getIncrement, getRandomNum } from "./utils";
import { Sizes, CollisionBox, ObstacleType } from "./models";
import { gameConfig as config } from "./config";

import image from "./assets/obstacle-sprite.png";

/**
 * Препятсвие
 */
export default class Obstacle {
  /** Спрайт */
  static _imageSprite: CanvasImageSource;
  /** Контекст канваса */
  canvasCtx: CanvasRenderingContext2D;
  /** Размеры канваса */
  canvasSizes: Sizes;
  /** Тип препятствия */
  typeConfig: ObstacleType;
  /** Области пересечения */
  collisionBoxes: CollisionBox[];
  /** Позиция по горизонтали */
  xPos: number;
  /** Позиция по вертикали */
  yPos: number;
  /** Отступ до следующего препятствия */
  gap: number;
  /** Флаг удаления при выходе из зоны видимости */
  remove: boolean;
  /** Флаг следующее препятствие добавлено */
  followingObstacleCreated: boolean;

  constructor(
    canvasCtx: CanvasRenderingContext2D,
    sizes: Sizes,
    type: ObstacleType,
    speed: number,
    groundPosY: number,
  ) {
    this.canvasCtx = canvasCtx;
    this.canvasSizes = sizes;
    this.typeConfig = type;
    this.collisionBoxes = [];
    this.xPos = 0;
    this.yPos = groundPosY - this.typeConfig.sizes.height;
    this.gap = 0;
    this.remove = false;
    this.followingObstacleCreated = false;

    if (!Obstacle._imageSprite) {
      const d = document.createElement("img");
      d.src = image;
      Obstacle._imageSprite = d;
    }
    this.init(speed);
  }
  /** Инициализация */
  init(speed: number) {
    this.cloneCollisionBoxes();
    this.xPos = this.canvasSizes.width;
    this.draw();
    this.gap = this.getGap(speed);
  }
  /**
   * Обновление расположения препятствия
   * @param deltaTime
   * @param speed
   */
  update(deltaTime: number, speed: number) {
    if (!this.remove) {
      this.xPos -= getIncrement(deltaTime, speed, config.global.FPS);
      this.draw();
      if (!this.isVisible()) {
        this.remove = true;
      }
    }
  }
  /** Отрисовка */
  draw() {
    this.canvasCtx.drawImage(
      Obstacle._imageSprite,
      this.typeConfig.pos.x,
      this.typeConfig.pos.y,
      this.typeConfig.sizes.width,
      this.typeConfig.sizes.height,
      this.xPos,
      this.yPos,
      this.typeConfig.sizes.width,
      this.typeConfig.sizes.height,
    );
  }
  /**
   * Получение случайного отступа ов зависимости от скорости
   */
  getGap(speed: number) {
    const minGap = Math.round(
      this.typeConfig.sizes.width * speed +
        this.typeConfig.minGap * config.obstacle.GAP_COEFFICIENT,
    );
    const maxGap = Math.round(minGap * config.obstacle.MAX_GAP_COEFFICIENT);
    return getRandomNum(minGap, maxGap);
  }
  /**
   * Проверка что препятствие в области видимости
   */
  isVisible(): boolean {
    return this.xPos + this.typeConfig.sizes.width > 0;
  }
  /**
   * Копирование областей пересечения из типа препятствия
   */
  cloneCollisionBoxes() {
    const { collisionBoxes } = this.typeConfig;
    for (let i = collisionBoxes.length - 1; i >= 0; i--) {
      this.collisionBoxes[i] = new CollisionBox(
        collisionBoxes[i].x,
        collisionBoxes[i].y,
        collisionBoxes[i].width,
        collisionBoxes[i].height,
      );
    }
  }
}
