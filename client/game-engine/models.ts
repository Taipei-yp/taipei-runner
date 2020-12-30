/** Координаты */
export type Coords = {
  x: number;
  y: number;
};

/** Размеры */
export type Sizes = {
  width: number;
  height: number;
};

/** Координаты с шириной */
export type CoordsAndWidth = Coords & { width: number };

/** Область пересечения */
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

/** Тип препятствия */
export type ObstacleType = {
  /** Название */
  type: string;
  /** Размеры в спрайте */
  sizes: Sizes;
  /** Начальная точка в спрайте */
  pos: Coords;
  /** Speed at which multiples are allowed */
  multipleSpeed: number;
  /** Minimum speed which the obstacle can make an appearance */
  minSpeed: number;
  /** minimum pixel space betweeen obstacles */
  minGap: number;
  collisionBoxes: CollisionBox[];
};

/** Тип линии горизонта */
export type HorizontLineType = {
  type: string;
  sizes: Sizes;
  spriteCoords: Coords;
  groundYMargin: number;
};

/** Набор фреймов и время отображения фрейма */
export type FrameSetType = {
  msPerFrame: number;
  frames: CoordsAndWidth[];
};
