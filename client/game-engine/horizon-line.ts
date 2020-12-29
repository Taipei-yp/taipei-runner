import { Dimensions, HorizontLineType } from "./models";
import { gameConfig as config } from "./config";
/**
 * Horizon Line.
 * Consists of connecting lines.
 * @constructor
 */
export default class HorizonLine {
  canvasCtx: CanvasRenderingContext2D;
  canvasDimensions: Dimensions;
  typeConfig: HorizontLineType;
  imageSprite: HTMLImageElement;
  yPosLowerSide: boolean;
  yPos: number;
  xPos: number[];

  constructor(
    canvasCtx: CanvasRenderingContext2D,
    canvasDimensions: Dimensions,
    imageSprite: HTMLImageElement,
    type: HorizontLineType,
    yPos = 0,
    yPosLowerSide = false,
  ) {
    this.canvasCtx = canvasCtx;
    this.canvasDimensions = canvasDimensions;
    this.typeConfig = type;
    this.imageSprite = imageSprite;
    this.yPosLowerSide = yPosLowerSide;
    this.yPos = yPos;
    if (this.yPosLowerSide) {
      this.yPos =
        this.canvasDimensions.height -
        this.typeConfig.dimensions.height -
        this.yPos;
    }
    this.xPos = [];
    this.defaultXPos();
    this.draw();
  }

  /**
   * Draw the horizon line.
   */
  draw(): void {
    this.xPos.forEach(el => {
      this.canvasCtx.drawImage(
        this.imageSprite,
        this.typeConfig.spriteCoords.x,
        this.typeConfig.spriteCoords.y,
        this.typeConfig.dimensions.width,
        this.typeConfig.dimensions.height,
        el,
        this.yPos,
        this.typeConfig.dimensions.width,
        this.typeConfig.dimensions.height,
      );
    });
  }

  /**
   * Update the x position of an indivdual piece of the line.
   */
  updateXPos(increment: number) {
    for (let i = 0; i < this.xPos.length; i++) {
      this.xPos[i] -= increment;
      if (this.xPos[i] < -this.typeConfig.dimensions.width) {
        this.xPos.shift();
        this.xPos.push(this.xPos[this.xPos.length - 1] + increment);
      }
    }
  }

  update(deltaTime: number, speed: number) {
    const increment = Math.floor(speed * (config.FPS / 1000) * deltaTime);
    this.updateXPos(increment);
    this.draw();
  }

  defaultXPos(): void {
    const count =
      Math.ceil(
        this.canvasDimensions.width / this.typeConfig.dimensions.width,
      ) + 1;
    for (let i = 0; i < count; i++) {
      this.xPos.push(i * this.typeConfig.dimensions.width);
    }
  }

  reset(): void {
    this.defaultXPos();
  }
}
