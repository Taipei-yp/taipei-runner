import { Dimensions } from "./models";
// import { getRandomNum } from "./utils";
import HorizonLine from "./horizon-line";
import Obstacle from "./obstacle";
import {
  gameConfig as config,
  // obstacleTypes,
  horizontLineTypes,
} from "./config";

import image from "./assets/horizon-sprite.png";
/**
 * Horizon background class.
 */
export default class Horizon {
  static _imageSprite: HTMLImageElement;

  canvasCtx: CanvasRenderingContext2D;
  canvasDimensions: Dimensions;
  horizonLines: HorizonLine[];
  obstacleHistory: string[];
  obstacles: Obstacle[];

  groundPosY: number;

  constructor(
    canvasCtx: CanvasRenderingContext2D,
    canvasDimensions: Dimensions,
    groundPosY: number,
  ) {
    this.canvasCtx = canvasCtx;
    this.canvasDimensions = canvasDimensions;
    this.obstacles = [];
    this.obstacleHistory = [];
    this.horizonLines = [];
    this.groundPosY = groundPosY;
    if (!Horizon._imageSprite) {
      const d = document.createElement("img");
      d.src = image;
      d.onload = () => {
        console.log("load");
        this.init();
      };
      Horizon._imageSprite = d;
    }
  }

  init() {
    this.horizonLines.push(
      new HorizonLine(
        this.canvasCtx,
        this.canvasDimensions,
        Horizon._imageSprite,
        horizontLineTypes[0],
        this.groundPosY,
      ),
    );
  }

  update(deltaTime: number, currentSpeed: number, updateObstacles: boolean) {
    this.horizonLines.forEach(el => el.update(deltaTime, currentSpeed));

    let updateObstacless = updateObstacles;
    updateObstacless = false;
    if (updateObstacless) {
      this.updateObstacles(deltaTime, currentSpeed);
    }
  }

  updateObstacles(deltaTime: number, currentSpeed: number): void {
    const updatedObstacles = this.obstacles.slice(0);

    for (let i = 0; i < this.obstacles.length; i++) {
      this.obstacles[i].update(deltaTime, currentSpeed);

      // Clean up existing obstacles.
      if (this.obstacles[i].remove) {
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
        lastObstacle.xPos +
          lastObstacle.typeConfig.dimensions.width +
          lastObstacle.gap <
          this.canvasDimensions.width
      ) {
        this.addNewObstacle(currentSpeed);
        lastObstacle.followingObstacleCreated = true;
      }
    } else {
      this.addNewObstacle(currentSpeed);
    }
  }

  /**
   * Add a new obstacle.
   * @param _currentSpeed
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addNewObstacle(_currentSpeed?: number) {
    /* const obstacleTypeIndex = getRandomNum(0, obstacleTypes.length - 1);
    const obstacleType = obstacleTypes[obstacleTypeIndex];

    // Check for multiples of the same type of obstacle.
    // Also check obstacle is available at current speed.
    if (
      this.duplicateObstacleCheck(obstacleType.type) ||
      currentSpeed < obstacleType.minSpeed
    ) {
      this.addNewObstacle(currentSpeed);
    } else {
      this.obstacles.push(
        new Obstacle(
          this.canvasCtx,
          this.canvasDimensions,
          obstacleType,
          config.GAP_COEFFICIENT,
          currentSpeed,
        ),
      );

      this.obstacleHistory.unshift(obstacleType.type);

      if (this.obstacleHistory.length > 1) {
        this.obstacleHistory.splice(config.MAX_OBSTACLE_DUPLICATION);
      } 
    } */
  }

  /**
   * Returns whether the previous two obstacles are the same as the next one.
   * Maximum duplication is set in config value config.MAX_OBSTACLE_DUPLICATION.
   * @return {boolean}
   */
  duplicateObstacleCheck(nextObstacleType: string) {
    let duplicateCount = 0;
    for (let i = 0; i < this.obstacleHistory.length; i++) {
      duplicateCount =
        this.obstacleHistory[i] === nextObstacleType ? duplicateCount + 1 : 0;
    }
    return duplicateCount >= config.MAX_OBSTACLE_DUPLICATION;
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
