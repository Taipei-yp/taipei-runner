import { ObstacleType, HorizontLineType, CollisionBox } from "./models";
/** Game configuration. */
const gameConfig = {
  ACCELERATION: 0.001,
  BG_CLOUD_SPEED: 0.2,
  BOTTOM_PAD: 10,
  CLEAR_TIME: 3000,
  CLOUD_FREQUENCY: 0.5,
  GAMEOVER_CLEAR_TIME: 750,
  GAP_COEFFICIENT: 0.6,
  GRAVITY: 0.6,
  INITIAL_JUMP_VELOCITY: 12,
  MAX_CLOUDS: 6,
  /** Maximum obstacle grouping count. */
  MAX_OBSTACLE_LENGTH: 3,
  MAX_OBSTACLE_DUPLICATION: 2,
  /** Coefficient for calculating the maximum gap. */
  MAX_GAP_COEFFICIENT: 1.5,
  MAX_SPEED: 13,
  MIN_JUMP_HEIGHT: 35,
  RESOURCE_TEMPLATE_ID: "audio-resources",
  SPEED: 6,
  SPEED_DROP_COEFFICIENT: 3,
  FPS: 60,
  DEFAULT_WIDTH: 600,
  DEFAULT_HEIGHT: 400,
  FILL_COLOR: "#000239",
};

const spriteDefinition = {
  CLOUD: { x: 86, y: 2 },
  HORIZON: { x: 2, y: 54 },
  PTERODACTYL: { x: 134, y: 2 },
  RESTART: { x: 2, y: 2 },
  TEXT_SPRITE: { x: 484, y: 2 },
  hero: { x: 677, y: 2 },
};

const obstacleTypes: ObstacleType[] = [
  {
    type: "BOX1",
    spriteCoords: { x: 0, y: 20 },
    dimensions: { width: 86, height: 80 },
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
    dimensions: { width: 623, height: 320 },
  },
];
export { gameConfig, spriteDefinition, obstacleTypes, horizontLineTypes };
