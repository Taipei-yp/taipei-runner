<<<<<<< HEAD
=======
import { Sizes, HorizontLineType } from "./models";
>>>>>>> 6f8d9c8... refactoring code; add some comments
import { gameConfig as config } from "./config";
import { HorizontLineType, Sizes } from "./models";
import { getIncrement } from "./utils";

/**
 * Фоновая горизонтальная линия
 */
export default class HorizonLine {
  /** Контекст канваса */
  canvasCtx: CanvasRenderingContext2D;
<<<<<<< HEAD
  /** Размеры канваса */
  canvasSizes: Sizes;
  /** Тип линии */
=======
  canvasDimensions: Sizes;
>>>>>>> 6f8d9c8... refactoring code; add some comments
  typeConfig: HorizontLineType;
  /** Спарайт */
  imageSprite: HTMLImageElement;
  /** Вертикальная координата для отрисовки */
  yPos: number;
  /** Горизонтальные координаты для отрисовки */
  xPos: number[];

  constructor(
    canvasCtx: CanvasRenderingContext2D,
<<<<<<< HEAD
    canvasSizes: Sizes,
=======
    canvasDimensions: Sizes,
>>>>>>> 6f8d9c8... refactoring code; add some comments
    imageSprite: HTMLImageElement,
    type: HorizontLineType,
    yPos = 0,
  ) {
    this.canvasCtx = canvasCtx;
    this.canvasSizes = canvasSizes;
    this.typeConfig = type;
    this.imageSprite = imageSprite;
    this.yPos = yPos;
    if (!this.yPos) {
      this.yPos = canvasSizes.height;
    }
    this.yPos -= this.typeConfig.groundYMargin;
    this.xPos = [];
    this.defaultXPos();
    this.draw();
  }
<<<<<<< HEAD
  /** Обновление позиции */
  update(deltaTime: number, speed: number): void {
    this.updateXPos(getIncrement(deltaTime, speed, config.global.FPS));
    this.draw();
  }
  /** Сброс в начальное положение */
  reset(): void {
    this.defaultXPos();
  }
=======

  draw(): void {
    this.xPos.forEach(el => {
      this.canvasCtx.drawImage(
        this.imageSprite,
        this.typeConfig.spriteCoords.x,
        this.typeConfig.spriteCoords.y,
        this.typeConfig.sizes.width,
        this.typeConfig.sizes.height,
        el,
        this.yPos,
        this.typeConfig.sizes.width,
        this.typeConfig.sizes.height,
      );
    });
  }

  update(deltaTime: number, speed: number) {
    const increment = Math.floor(speed * (config.FPS / 1000) * deltaTime);
    this.updateXPos(increment);
    this.draw();
  }

  reset(): void {
    this.defaultXPos();
  }

>>>>>>> 6f8d9c8... refactoring code; add some comments
  /**
   * Обновление горизонтальных координат на заданную величину
   */
  updateXPos(increment: number): void {
    for (let i = 0; i < this.xPos.length; i++) {
      this.xPos[i] -= increment;
      if (this.xPos[i] < -this.typeConfig.sizes.width) {
        this.xPos.shift();
        this.xPos.push(
          this.xPos[this.xPos.length - 1] + this.typeConfig.sizes.width,
        );
        i--;
      }
    }
  }
<<<<<<< HEAD
  /** Установка горизонтальных координат в начальное положение  */
  defaultXPos(): void {
    const count =
      Math.ceil(this.canvasSizes.width / this.typeConfig.sizes.width) + 1;
=======

  defaultXPos(): void {
    const count =
      Math.ceil(this.canvasDimensions.width / this.typeConfig.sizes.width) + 1;
>>>>>>> 6f8d9c8... refactoring code; add some comments
    for (let i = 0; i < count; i++) {
      this.xPos.push(i * this.typeConfig.sizes.width);
    }
  }
<<<<<<< HEAD
  /** Отрисовка */
  draw(): void {
    this.xPos.forEach(el => {
      this.canvasCtx.drawImage(
        this.imageSprite,
        this.typeConfig.pos.x,
        this.typeConfig.pos.y,
        this.typeConfig.sizes.width,
        this.typeConfig.sizes.height,
        el,
        this.yPos,
        this.typeConfig.sizes.width,
        this.typeConfig.sizes.height,
      );
    });
  }
=======
>>>>>>> 6f8d9c8... refactoring code; add some comments
}
