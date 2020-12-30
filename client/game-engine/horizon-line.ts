import { Sizes, HorizontLineType } from "./models";
import { gameConfig as config } from "./config";
/**
 * Horizon Line.
 * Consists of connecting lines.
 * @constructor
 */
export default class HorizonLine {
  canvasCtx: CanvasRenderingContext2D;
  canvasDimensions: Sizes;
  typeConfig: HorizontLineType;
  imageSprite: HTMLImageElement;
  yPos: number;
  xPos: number[];

  constructor(
    canvasCtx: CanvasRenderingContext2D,
    canvasDimensions: Sizes,
    imageSprite: HTMLImageElement,
    type: HorizontLineType,
    yPos = 0,
  ) {
    this.canvasCtx = canvasCtx;
    this.canvasDimensions = canvasDimensions;
    this.typeConfig = type;
    this.imageSprite = imageSprite;
    this.yPos = yPos;
    if (!this.yPos) {
      this.yPos = canvasDimensions.height;
    }
    this.yPos -= this.typeConfig.groundYMargin;
    this.xPos = [];
    this.defaultXPos();
    this.draw();
  }

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

  /**
   * Update the x position of an indivdual piece of the line.
   */
  updateXPos(increment: number) {
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

  defaultXPos(): void {
    const count =
      Math.ceil(this.canvasDimensions.width / this.typeConfig.sizes.width) + 1;
    for (let i = 0; i < count; i++) {
      this.xPos.push(i * this.typeConfig.sizes.width);
    }
  }
}
