import image from "./assets/horizon-sprite.png";
import {
  gameConfig as config,
  horizontLineTypes,
  obstacleTypes,
} from "./config";
import HorizonLine from "./horizon-line";
import { Sizes } from "./models";
import Obstacle from "./obstacle";
import { getRandomNum } from "./utils";

import image from "./assets/horizon-sprite.png";
/**
 * Движущийся фон, пол, препятствия
 */
export default class Horizon {
  /** Спрайт */
  imageSprite: HTMLImageElement;
  /** Контекст канваса */
  canvasCtx: CanvasRenderingContext2D;
  /** Размеры канваса */
  canvasSizes: Sizes;
  /** Y Координата земли */
  groundPosY: number;
  /** Фоновые линии */
  horizonLines: HorizonLine[];
  /** Препятствия */
  obstacles: Obstacle[];
  /** История препятствий */
  obstacleHistory: string[];

  constructor(
    canvasCtx: CanvasRenderingContext2D,
    canvasDimensions: Sizes,
    groundPosY: number,
  ) {
    this.canvasCtx = canvasCtx;
    this.canvasSizes = canvasDimensions;
    this.groundPosY = groundPosY;
    this.horizonLines = [];
    this.obstacles = [];
    this.obstacleHistory = [];

    const d = document.createElement("img");
    d.src = image;
    d.onload = () => {
      console.log("load");
      this.init();
    };
    this.imageSprite = d;
  }
  /** Инициализация */
  init() {
    this.horizonLines.push(
      new HorizonLine(
        this.canvasCtx,
        this.canvasSizes,
        this.imageSprite,
        horizontLineTypes[0],
        this.groundPosY,
      ),
    );
  }
  /** Обновление */
  update(deltaTime: number, currentSpeed: number, updateObstacles: boolean) {
    this.horizonLines.forEach(el => el.update(deltaTime, currentSpeed));
    if (updateObstacles) {
      this.updateObstacles(deltaTime, currentSpeed);
    }
  }
  /** Обновление препятствий */
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
          lastObstacle.typeConfig.sizes.width +
          lastObstacle.gap <
          this.canvasSizes.width
      ) {
        this.addNewObstacle(currentSpeed);
        lastObstacle.followingObstacleCreated = true;
      }
    } else {
      this.addNewObstacle(currentSpeed);
    }
  }
  /**
   * Добавление препятствия
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addNewObstacle(currentSpeed: number) {
    const obstacleTypeIndex = getRandomNum(0, obstacleTypes.length - 1);
    const obstacleType = obstacleTypes[obstacleTypeIndex];

    // Проверка кол-ва повторений одного типа препятствия и ограничения мин. скорости
    if (
      obstacleTypes.length > 1 &&
      (this.maxRepeatObstacleCheck(obstacleType.type) ||
        currentSpeed < obstacleType.minSpeed)
    ) {
      this.addNewObstacle(currentSpeed);
    } else {
      this.obstacles.push(
        new Obstacle(
          this.canvasCtx,
          this.canvasSizes,
          obstacleType,
          currentSpeed,
          this.groundPosY,
        ),
      );
      this.obstacleHistory.unshift(obstacleType.type);
      if (this.obstacleHistory.length > 1) {
        this.obstacleHistory.splice(config.horizon.MAX_OBSTACLE_DUPLICATION);
      }
    }
  }
  /**
   * Проверяет повтор типа перпятствия.
   * Максимальное количество повторов одного типа задается в конфиге в поле MAX_OBSTACLE_DUPLICATION
   */
  maxRepeatObstacleCheck(nextObstacleType: string): boolean {
    let duplicateCount = 0;
    for (let i = 0; i < this.obstacleHistory.length; i++) {
      duplicateCount =
        this.obstacleHistory[i] === nextObstacleType ? duplicateCount + 1 : 0;
    }
    return duplicateCount >= config.horizon.MAX_OBSTACLE_DUPLICATION;
  }
  /**
   * Сброс в начальное состояние
   */
  reset(): void {
    this.obstacles = [];
    this.horizonLines.forEach(el => el.reset());
  }
}
