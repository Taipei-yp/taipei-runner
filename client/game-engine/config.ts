import { CollisionBox, HorizontLineType, ObstacleType } from "./models";
/** Настройки игры */
const gameConfig = {
  /** Режим отладки */
  IS_DEBUG: false,
  global: {
    /** Кадров в секунду */
    FPS: 60,
    /** Ускорение движения */
    ACCELERATION: 0.001,
    /** Максимальная скорость */
    MAX_SPEED: 13,
    /** Начальная скорость */
    START_SPEED: 6,
    /** Позиция земли относительно нижнего края */
    GROUND_POS: 200,
    /** Время от старта до появления препятствий */
    CLEAR_TIME: 3000,
    /** Коэффициент для перевода длинны забега в счет */
    SCORE_COEFFICIENT: 0.025,
  },
  view: {
    /** Ширина по уполчанию */
    DEFAULT_WIDTH: 600,
    /** Высота по уполчанию */
    DEFAULT_HEIGHT: 200,
    /** Цвет фона */
    FILL_COLOR: "#000239",
  },
  obstacle: {
    /** Коэффициент размера отступа */
    GAP_COEFFICIENT: 0.6,
    /** Коэффициент максимального размера отступа */
    MAX_GAP_COEFFICIENT: 1.5,
  },
  horizon: {
    /** Максимальное число повторений одного препятствия */
    MAX_OBSTACLE_DUPLICATION: 2,
  },
  hero: {
    /** Высота кадра в спрайте */
    SRC_HEIGHT: 77,
    /** Высота героя в игре */
    HEIGHT: 130,
    /** Начальная позиция героя */
    START_POS_X: 200,
    /** Минимальная высота прыжка */
    MIN_JUMP_HEIGHT: 10,
    /** Максимальная высота прыжка */
    MAX_JUMP_HEIGHT: 80,
    /** Гравитация */
    GRAVITY: 0.2,
    /** Начальная скорость прыжка */
    INITIAL_JUMP_VELOCITY: -10,
    DROP_VELOCITY: -5,
    SPEED_DROP_COEFFICIENT: 3,
  },
  audio: {
    bgVolume: 0.1,
  },
};
/** Препятствия */
const obstacleTypes: ObstacleType[] = [
  {
    type: "BOX1",
    pos: { x: 0, y: 20 },
    sizes: { width: 86, height: 80 },
    minGap: 140,
    minSpeed: 0,
    collisionBoxes: [new CollisionBox(0, 0, 85, 54)],
  },
  {
    type: "BOX2",
    pos: { x: 88, y: 10 },
    sizes: { width: 52, height: 90 },
    minGap: 140,
    minSpeed: 0,
    collisionBoxes: [new CollisionBox(0, 0, 52, 90)],
  },
  {
    type: "BOX3",
    pos: { x: 301, y: 33 },
    sizes: { width: 176, height: 67 },
    minGap: 180,
    minSpeed: 0,
    collisionBoxes: [
      new CollisionBox(4, 0, 149, 30),
      new CollisionBox(0, 30, 176, 36),
    ],
  },
];
/** Горизонтальные линии */
const horizontLineTypes: HorizontLineType[] = [
  {
    type: "FLOOR",
    pos: { x: 0, y: 0 },
    sizes: { width: 623, height: 320 },
    groundYMargin: 123,
  },
];

export { gameConfig, horizontLineTypes, obstacleTypes };
