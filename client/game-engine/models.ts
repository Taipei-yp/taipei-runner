/**
 * Coordinates object
 */
export type Coords = {
  x: number;
  y: number;
};

export type Dimensions = {
  WIDTH: number;
  HEIGHT: number;
};

/** Collision box object.
 * @param x X position.
 * @param y Y Position.
 * @param w Width.
 * @param h Height.
 */
export class CollisionBox {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }
}
