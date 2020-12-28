export type Coords = {
  x: number;
  y: number;
};

export type Dimensions = {
  width: number;
  height: number;
};

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

export type ObstacleType = {
  /** Name */
  type: string;
  dimensions: Dimensions;
  /** Variable height */
  // yPos: number;
  spriteCoords: Coords;
  /** Speed at which multiples are allowed */
  multipleSpeed: number;
  /** Minimum speed which the obstacle can make an appearance */
  minSpeed: number;
  /** minimum pixel space betweeen obstacles */
  minGap: number;
  collisionBoxes: CollisionBox[];
};

export type HorizontLineType = {
  type: string;
  dimensions: Dimensions;
  spriteCoords: Coords;
};
