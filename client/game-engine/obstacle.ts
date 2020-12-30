import { getRandomNum } from "./utils";
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
  /** Размеры канваса */
  typeConfig: ObstacleType;

  remove: boolean;
  xPos: number;
  yPos: number;
  collisionBoxes: CollisionBox[];
  gap: number;
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

    this.remove = false;
    this.xPos = 0;
    this.yPos = groundPosY - this.typeConfig.sizes.height;
    this.collisionBoxes = [];
    this.gap = 0;
    this.followingObstacleCreated = false;

    if (!Obstacle._imageSprite) {
      const d = document.createElement("img");
      d.src = image;
      Obstacle._imageSprite = d;
    }

    this.init(speed);
  }

  init(speed: number) {
    this.cloneCollisionBoxes();
    this.xPos = this.canvasSizes.width - this.typeConfig.sizes.width;
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
      this.xPos -= Math.floor(((speed * config.FPS) / 1000) * deltaTime);
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
   * Calculate a random gap size.
   * - Minimum gap gets wider as speed increses
   * @param speed
   * @return The gap size.
   */
  getGap(speed: number) {
    const minGap = Math.round(
      this.typeConfig.sizes.width * speed +
        this.typeConfig.minGap * config.GAP_COEFFICIENT,
    );
    const maxGap = Math.round(minGap * config.MAX_GAP_COEFFICIENT);
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
