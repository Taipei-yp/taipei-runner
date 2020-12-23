import { Coords, Dimensions } from "./models";
import { getRandomNum } from "./utils";
import HorizonLine from "./horizon-line";
import Obstacle, { ObstacleTypes } from "./obstacle";

// #QA Runner.config.MAX_OBSTACLE_DUPLICATION
const MAX_OBSTACLE_DUPLICATION = 3;

/**
 * Horizon background class.
 * @param {HTMLCanvasElement} canvas
 * @param {Object} spritePos Sprite positioning.
 * @param {Object} dimensions Canvas dimensions.
 * @param {number} gapCoefficient
 * @constructor
 */
export default class Horizon {
  /**
   * Horizon config.
   * @enum {number}
   */
  static config = {
    BG_CLOUD_SPEED: 0.2,
    BUMPY_THRESHOLD: 0.3,
    CLOUD_FREQUENCY: 0.5,
    HORIZON_HEIGHT: 16,
    MAX_CLOUDS: 6,
  };

  canvasCtx: CanvasRenderingContext2D;
  horizonLines: HorizonLine[];
  obstacleHistory: string[];
  obstacles: Obstacle[];
  gapCoefficient: number;
  dimensions: Dimensions;
  horizonOffsets: number[];
  spritePos: Record<string, Coords>;

  imageSprite: CanvasImageSource;

  constructor(
    canvas: HTMLCanvasElement,
    imageSprite: CanvasImageSource,
    spritePos: Record<string, Coords>,
    dimensions: Dimensions,
    gapCoefficient: number,
  ) {
    const canvasCtx = canvas.getContext("2d");
    if (canvasCtx == null) throw new Error("Empty canvas context");
    this.canvasCtx = canvasCtx;

    this.dimensions = dimensions;
    this.gapCoefficient = gapCoefficient;
    this.obstacles = [];
    this.obstacleHistory = [];
    this.horizonOffsets = [0, 0];
    this.spritePos = spritePos;
    this.imageSprite = imageSprite;
    // Horizon
    this.horizonLines = [];

    this.init();
  }

  /**
   * Initialise the horizon. Just add the line and a cloud. No obstacles.
   */
  init() {
    this.horizonLines.push(
      new HorizonLine(this.canvasCtx, this.imageSprite, this.spritePos.HORIZON),
    );
  }

  /**
   * @param {number} deltaTime
   * @param {number} currentSpeed
   * @param {boolean} updateObstacles Used as an override to prevent
   *     the obstacles from being updated / added. This happens in the
   *     ease in section.
   */
  update(deltaTime: number, currentSpeed: number, updateObstacles: boolean) {
    // this.runningTime += deltaTime;
    this.horizonLines.forEach(el => el.update(deltaTime, currentSpeed));

    if (updateObstacles) {
      this.updateObstacles(deltaTime, currentSpeed);
    }
  }

  /**
   * Update the obstacle positions.
   * @param {number} deltaTime
   * @param {number} currentSpeed
   */
  updateObstacles(deltaTime: number, currentSpeed: number): void {
    // Obstacles, move to Horizon layer.
    const updatedObstacles = this.obstacles.slice(0);

    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.update(deltaTime, currentSpeed);

      // Clean up existing obstacles.
      if (obstacle.remove) {
        updatedObstacles.shift();
      }
    }
    this.obstacles = updatedObstacles;

    if (this.obstacles.length > 0) {
      const lastObstacle = this.obstacles[this.obstacles.length - 1];

      if (
        lastObstacle &&
        !lastObstacle.followingObstacleCreated &&
        lastObstacle.isVisible() &&
        lastObstacle.xPos + lastObstacle.width + lastObstacle.gap <
          this.dimensions.WIDTH
      ) {
        this.addNewObstacle(currentSpeed);
        lastObstacle.followingObstacleCreated = true;
      }
    } else {
      // Create new obstacles.
      this.addNewObstacle(currentSpeed);
    }
  }

  /**
   * Add a new obstacle.
   * @param currentSpeed
   */
  addNewObstacle(currentSpeed: number) {
    const obstacleTypeIndex = getRandomNum(0, ObstacleTypes.length - 1);
    const obstacleType = ObstacleTypes[obstacleTypeIndex];

    // Check for multiples of the same type of obstacle.
    // Also check obstacle is available at current speed.
    if (
      this.duplicateObstacleCheck(obstacleType.type) ||
      currentSpeed < obstacleType.minSpeed
    ) {
      this.addNewObstacle(currentSpeed);
    } else {
      const obstacleSpritePos = this.spritePos[obstacleType.type];

      this.obstacles.push(
        new Obstacle(
          this.canvasCtx,
          obstacleType,
          obstacleSpritePos,
          this.imageSprite,
          this.dimensions,
          this.gapCoefficient,
          currentSpeed,
        ),
      );

      this.obstacleHistory.unshift(obstacleType.type);

      if (this.obstacleHistory.length > 1) {
        this.obstacleHistory.splice(MAX_OBSTACLE_DUPLICATION);
      }
    }
  }

  /**
   * Returns whether the previous two obstacles are the same as the next one.
   * Maximum duplication is set in config value MAX_OBSTACLE_DUPLICATION.
   * @return {boolean}
   */
  duplicateObstacleCheck(nextObstacleType: string) {
    let duplicateCount = 0;
    for (let i = 0; i < this.obstacleHistory.length; i++) {
      duplicateCount =
        this.obstacleHistory[i] === nextObstacleType ? duplicateCount + 1 : 0;
    }
    return duplicateCount >= MAX_OBSTACLE_DUPLICATION;
  }

  /**
   * Reset the horizon layer.
   * Remove existing obstacles and reposition the horizon line.
   */
  reset() {
    this.obstacles = [];
    this.horizonLines.forEach(el => el.reset());
  }
}
