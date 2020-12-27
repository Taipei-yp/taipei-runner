import { getRandomNum } from "./utils";
import { Coords, Dimensions, CollisionBox } from "./models";
import { gameConfig as config } from "./config";

// import * from "./images/obstacle-sprite.png"
/**
 * Obstacle.
 * @param {CanvasRenderingContext2D} canvasCtx
 * @param {Obstacle.type} type
 * @param {Object} spritePos Obstacle position in sprite.
 * @param {Object} dimensions
 * @param gapCoefficient Mutipler in determining the gap.
 * @param speed
 */
export default class Obstacle {
  canvasCtx: CanvasRenderingContext2D;
  spritePos: Coords;
  typeConfig: ObstacleType;
  gapCoefficient: number;
  dimensions: Dimensions;
  remove: boolean;
  xPos: number;
  yPos: number;
  collisionBoxes: CollisionBox[];
  gap: number;
  imageSprite: CanvasImageSource;
  followingObstacleCreated: boolean;
  width: number;

  constructor(
    canvasCtx: CanvasRenderingContext2D,
    type: ObstacleType,
    spriteImgPos: Coords,
    imageSprite: CanvasImageSource,
    dimensions: Dimensions,
    gapCoefficient: number,
    speed: number,
  ) {
    this.canvasCtx = canvasCtx;
    this.spritePos = spriteImgPos;
    this.typeConfig = type;
    this.gapCoefficient = gapCoefficient;
    this.dimensions = dimensions;
    this.remove = false;
    this.xPos = 0;
    this.yPos = 0;
    this.collisionBoxes = [];
    this.gap = 0;
    this.imageSprite = imageSprite;
    this.followingObstacleCreated = false;
    this.init(speed);
    this.width = 0;
  }

  /**
   * Initialise the DOM for the obstacle.
   * @param speed
   */
  init(speed: number) {
    this.cloneCollisionBoxes();

    this.xPos = this.dimensions.WIDTH - this.typeConfig.width;

    this.draw();

    // Make collision box adjustments,
    // Central box is adjusted to the size as one box.
    //      ____        ______        ________
    //    _|   |-|    _|     |-|    _|       |-|
    //   | |<->| |   | |<--->| |   | |<----->| |
    //   | | 1 | |   | |  2  | |   | |   3   | |
    //   |_|___|_|   |_|_____|_|   |_|_______|_|
    //
    /* if (this.size > 1) {
      this.collisionBoxes[1].width =
        this.width -
        this.collisionBoxes[0].width -
        this.collisionBoxes[2].width;
      this.collisionBoxes[2].x = this.width - this.collisionBoxes[2].width;
    } */

    this.gap = this.getGap(this.gapCoefficient, speed);
  }

  /**
   * Draw and crop based on size.
   */
  draw() {
    this.canvasCtx.drawImage(
      this.imageSprite,
      this.spritePos.x,
      this.spritePos.y,
      this.typeConfig.width,
      this.typeConfig.height,
      this.xPos,
      this.yPos,
      this.typeConfig.width,
      this.typeConfig.height,
    );
  }

  /**
   * Obstacle frame update.
   * @param deltaTime
   * @param speed
   */
  update(deltaTime: number, speedp: number) {
    const speed = speedp;
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
  getGap(gapCoefficient: number, speed: number) {
    const minGap = Math.round(
      this.typeConfig.width * speed + this.typeConfig.minGap * gapCoefficient,
    );
    const maxGap = Math.round(minGap * config.MAX_GAP_COEFFICIENT);
    return getRandomNum(minGap, maxGap);
  }

  /**
   * Check if obstacle is visible.
   * @return {boolean} Whether the obstacle is in the game area.
   */
  isVisible(): boolean {
    return this.xPos + this.typeConfig.width > 0;
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

export type ObstacleType = {
  /** Name */
  type: string;
  width: number;
  height: number;
  /** Variable height */
  yPos: number;
  /** Speed at which multiples are allowed */
  multipleSpeed: number;
  /** Minimum speed which the obstacle can make an appearance */
  minSpeed: number;
  /** minimum pixel space betweeen obstacles */
  minGap: number;
  collisionBoxes: CollisionBox[];
};

export const ObstacleTypes: ObstacleType[] = [
  {
    type: "CACTUS_SMALL",
    width: 17,
    height: 35,
    yPos: 105,
    multipleSpeed: 4,
    minGap: 120,
    minSpeed: 0,
    collisionBoxes: [
      new CollisionBox(0, 7, 5, 27),
      new CollisionBox(4, 0, 6, 34),
      new CollisionBox(10, 4, 7, 14),
    ],
  },
  {
    type: "CACTUS_LARGE",
    width: 25,
    height: 50,
    yPos: 90,
    multipleSpeed: 7,
    minGap: 120,
    minSpeed: 0,
    collisionBoxes: [
      new CollisionBox(0, 12, 7, 38),
      new CollisionBox(8, 0, 7, 49),
      new CollisionBox(13, 10, 10, 38),
    ],
  },
];
