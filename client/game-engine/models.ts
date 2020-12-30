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
<<<<<<< HEAD
  /** Минимальная скорость с какой может появиться препятствие */
=======
  /** Speed at which multiples are allowed */
  multipleSpeed: number;
  /** Minimum speed which the obstacle can make an appearance */
>>>>>>> 6f8d9c8... refactoring code; add some comments
  minSpeed: number;
  /** Минимальный отступ между препятствиями в пикселях */
  minGap: number;
  /** Области пересечений для проверки столкновений */
  collisionBoxes: CollisionBox[];
};

<<<<<<< HEAD
/** Тип горизонтальной линии */
=======
/** Тип линии горизонта */
>>>>>>> 6f8d9c8... refactoring code; add some comments
export type HorizontLineType = {
  /** Название */
  type: string;
<<<<<<< HEAD
  /** Размеры изображения в спрайте */
  sizes: Sizes;
  /** Начальная точка в спрайте */
  pos: Coords;
  /** Отступ от верхнего края изображения до земли */
=======
  sizes: Sizes;
  spriteCoords: Coords;
>>>>>>> 6f8d9c8... refactoring code; add some comments
  groundYMargin: number;
};

/** Набор фреймов и время отображения фрейма */
export type FrameSetType = {
  /** Время отрисовки одного кадра */
  msPerFrame: number;
  /** Положение и ширина изображений кадров анимации */
  frames: CoordsAndWidth[];
};
