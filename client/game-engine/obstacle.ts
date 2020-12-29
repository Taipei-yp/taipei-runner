import { getRandomNum } from "./utils";
import { Dimensions, CollisionBox, ObstacleType } from "./models";
import { gameConfig as config } from "./config";

import image from "./assets/obstacle-sprite.png";
/**
 * Obstacle.
 * @param canvasCtx
 * @param dimensions
 * @param type
 * @param gapCoefficient Mutipler in determining the gap.
 * @param speed
 */
export default class Obstacle {
  static _imageSprite: CanvasImageSource;

  canvasCtx: CanvasRenderingContext2D;
  canvasDimensions: Dimensions;
  typeConfig: ObstacleType;
  gapCoefficient: number;
  remove: boolean;
  xPos: number;
  yPos: number;
  collisionBoxes: CollisionBox[];
  gap: number;
  followingObstacleCreated: boolean;

  constructor(
    canvasCtx: CanvasRenderingContext2D,
    dimensions: Dimensions,
    type: ObstacleType,
    gapCoefficient: number,
    speed: number,
    // spriteImgPos: Coords,
    // imageSprite?: CanvasImageSource,
  ) {
    this.canvasCtx = canvasCtx;
    this.canvasDimensions = dimensions;
    this.typeConfig = type;
    this.gapCoefficient = gapCoefficient;

    this.remove = false;
    this.xPos = 0;
    this.yPos = 0;
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
    this.xPos = this.canvasDimensions.width - this.typeConfig.dimensions.width;
    this.draw();
    this.gap = this.getGap(speed);
  }

  draw() {
    this.canvasCtx.drawImage(
      Obstacle._imageSprite,
      this.typeConfig.spriteCoords.x,
      this.typeConfig.spriteCoords.y,
      this.typeConfig.dimensions.width,
      this.typeConfig.dimensions.height,
      this.xPos,
      this.yPos,
      this.typeConfig.dimensions.width,
      this.typeConfig.dimensions.height,
    );
  }

  /**
   * Obstacle frame update.
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

  /**
   * Calculate a random gap size.
   * - Minimum gap gets wider as speed increses
   * @param gapCoefficient
   * @param speed
   * @return The gap size.
   */
  getGap(speed: number) {
    const minGap = Math.round(
      this.typeConfig.dimensions.width * speed +
        this.typeConfig.minGap * this.gapCoefficient,
    );
    const maxGap = Math.round(minGap * config.MAX_GAP_COEFFICIENT);
    return getRandomNum(minGap, maxGap);
  }

  /**
   * Check if obstacle is visible.
   * @return {boolean} Whether the obstacle is in the game area.
   */
  isVisible(): boolean {
    return this.xPos + this.typeConfig.dimensions.width > 0;
  }

  /**
   * Make a copy of the collision boxes, since these will change based on
   * obstacle type and size.
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
