import { Coords, Dimensions } from "./models";
// #QT
const FPS = 100;
/**
 * Horizon Line.
 * Consists of two connecting lines. Randomly assigns a flat / bumpy horizon.
 * @param {HTMLCanvasElement} canvas
 * @param {Coords} spritePos Horizon position in sprite.
 * @constructor
 */
export default class HorizonLine {
  /**
   * Horizon line dimensions.
   * @enum {number}
   */
  static dimensions: Dimensions & { YPOS: number } = {
    WIDTH: 600,
    HEIGHT: 12,
    YPOS: 127,
  };

  spritePos: Coords;
  canvasCtx: CanvasRenderingContext2D;
  dimensions: Dimensions;
  sourceDimensions: Dimensions;
  sourceXPos: number[];
  xPos: number[];
  yPos: number;
  bumpThreshold: number;

  imageSprite: CanvasImageSource;

  constructor(
    canvasCtx: CanvasRenderingContext2D,
    imageSprite: CanvasImageSource,
    spritePos: Coords,
  ) {
    this.canvasCtx = canvasCtx;
    this.imageSprite = imageSprite;
    this.spritePos = spritePos;
    this.dimensions = HorizonLine.dimensions;
    this.sourceDimensions = HorizonLine.dimensions;
    this.sourceXPos = [
      this.spritePos.x,
      this.spritePos.x + this.dimensions.WIDTH,
    ];

    this.xPos = [0, HorizonLine.dimensions.WIDTH];
    this.yPos = HorizonLine.dimensions.YPOS;

    this.bumpThreshold = 0.5;

    this.draw();
  }

  /**
   * Return the crop x position of a type.
   */
  getRandomType() {
    return Math.random() > this.bumpThreshold ? this.dimensions.WIDTH : 0;
  }

  /**
   * Draw the horizon line.
   */
  draw(): void {
    this.canvasCtx.drawImage(
      this.imageSprite,
      this.sourceXPos[0],
      this.spritePos.y,
      this.sourceDimensions.WIDTH,
      this.sourceDimensions.HEIGHT,
      this.xPos[0],
      this.yPos,
      this.dimensions.WIDTH,
      this.dimensions.HEIGHT,
    );

    this.canvasCtx.drawImage(
      this.imageSprite,
      this.sourceXPos[1],
      this.spritePos.y,
      this.sourceDimensions.WIDTH,
      this.sourceDimensions.HEIGHT,
      this.xPos[1],
      this.yPos,
      this.dimensions.WIDTH,
      this.dimensions.HEIGHT,
    );
  }

  /**
   * Update the x position of an indivdual piece of the line.
   * @param {number} pos Line position.
   * @param {number} increment
   */
  updateXPos(pos: number, increment: number) {
    const line1 = pos;
    const line2 = pos === 0 ? 1 : 0;

    this.xPos[line1] -= increment;
    this.xPos[line2] = this.xPos[line1] + this.dimensions.WIDTH;

    if (this.xPos[line1] <= -this.dimensions.WIDTH) {
      this.xPos[line1] += this.dimensions.WIDTH * 2;
      this.xPos[line2] = this.xPos[line1] - this.dimensions.WIDTH;
      this.sourceXPos[line1] = this.getRandomType() + this.spritePos.x;
    }
  }

  /**
   * Update the horizon line.
   * @param {number} deltaTime
   * @param {number} speed
   */
  update(deltaTime: number, speed: number) {
    const increment = Math.floor(speed * (FPS / 1000) * deltaTime);

    if (this.xPos[0] <= 0) {
      this.updateXPos(0, increment);
    } else {
      this.updateXPos(1, increment);
    }
    this.draw();
  }

  /**
   * Reset horizon to the starting position.
   */
  reset(): void {
    this.xPos[0] = 0;
    this.xPos[1] = HorizonLine.dimensions.WIDTH;
  }
}
