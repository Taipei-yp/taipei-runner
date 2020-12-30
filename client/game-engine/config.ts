import { ObstacleType, HorizontLineType, CollisionBox } from "./models";
/** Game configuration. */
const gameConfig = {
  ACCELERATION: 0.001,
  GROUND_POS: 200,
  CLEAR_TIME: 3000,
  GAMEOVER_CLEAR_TIME: 750,
  GAP_COEFFICIENT: 0.6,
  GRAVITY: 0.2,
  INITIAL_JUMP_VELOCITY: 12,
  /** Maximum obstacle grouping count. */
  MAX_OBSTACLE_LENGTH: 3,
  MAX_OBSTACLE_DUPLICATION: 2,
  /** Coefficient for calculating the maximum gap. */
  MAX_GAP_COEFFICIENT: 1.5,
  MAX_SPEED: 13,
  SPEED: 6,
  SPEED_DROP_COEFFICIENT: 3,
  FPS: 60,
  DEFAULT_WIDTH: 600,
  DEFAULT_HEIGHT: 400,
  FILL_COLOR: "#000239",
  CLASS_CRASHED: "crashed",
  CLASS_ICON: "icon-offline",
};

const heroConfig = {
  /** Высота кадра в стпрайте */
  SRC_HEIGHT: 77,
  /** Высота героя в игре */
  HEIGHT: 130,
  /** Начальная позиция героя */
  START_POS_X: 50,
  DROP_VELOCITY: -5,
  INIITAL_JUMP_VELOCITY: -10,
  MAX_JUMP_HEIGHT: 80,
  MIN_JUMP_HEIGHT: 10,
};

const obstacleTypes: ObstacleType[] = [
  {
    type: "BOX1",
    pos: { x: 0, y: 20 },
    sizes: { width: 86, height: 80 },
    multipleSpeed: 4,
    minGap: 140,
    minSpeed: 0,
    collisionBoxes: [
      new CollisionBox(0, 7, 5, 27),
      new CollisionBox(4, 0, 6, 34),
      new CollisionBox(10, 4, 7, 14),
    ],
  },
];
const horizontLineTypes: HorizontLineType[] = [
  {
    type: "FLOOR",
    spriteCoords: { x: 0, y: 0 },
    sizes: { width: 623, height: 320 },
    groundYMargin: 123,
  },
];
export { gameConfig, heroConfig, obstacleTypes, horizontLineTypes };
