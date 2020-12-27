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
  MOBILE_SPEED_COEFFICIENT: 1.2,
  RESOURCE_TEMPLATE_ID: "audio-resources",
  SPEED: 6,
  SPEED_DROP_COEFFICIENT: 3,
  FPS: 60,
  DEFAULT_WIDTH: 600,
  DEFAULT_HEIGHT: 400,
};

export { gameConfig };
