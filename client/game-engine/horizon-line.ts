import { gameConfig as config } from "./config";
import { HorizontLineType, Sizes } from "./models";
import { getIncrement } from "./utils";

/**
 * Фоновая горизонтальная линия
 */
export default class HorizonLine {
  /** Контекст канваса */
  canvasCtx: CanvasRenderingContext2D;
  /** Размеры канваса */
  canvasSizes: Sizes;
  /** Тип линии */
  typeConfig: HorizontLineType;
  /** Спарайт */
  imageSprite: HTMLImageElement;
  /** Вертикальная координата для отрисовки */
  yPos: number;
  /** Горизонтальные координаты для отрисовки */
  xPos: number[];

  constructor(
    canvasCtx: CanvasRenderingContext2D,
    canvasSizes: Sizes,
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
  /** Обновление позиции */
  update(deltaTime: number, speed: number): void {
    this.updateXPos(getIncrement(deltaTime, speed, config.global.FPS));
    this.draw();
  }
  /** Сброс в начальное положение */
  reset(): void {
    this.defaultXPos();
  }
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
  /** Установка горизонтальных координат в начальное положение  */
  defaultXPos(): void {
    const count =
      Math.ceil(this.canvasSizes.width / this.typeConfig.sizes.width) + 1;
    for (let i = 0; i < count; i++) {
      this.xPos.push(i * this.typeConfig.sizes.width);
    }
  }
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
}
