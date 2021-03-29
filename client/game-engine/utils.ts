import { CollisionBox } from "./models";

/** Получение изменения X координаты */
export function getIncrement(deltaTime: number, speed: number, fps: number) {
  return Math.floor(speed * (fps / 1000) * deltaTime);
}

/**
 * Получение случайного значения в заданных границах
 */
export function getRandomNum(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Получение текущего времени.
 */
export function getTimeStamp(): number {
  if (window.performance && window.performance.now)
    return window.performance.now();
  return new Date().getTime();
}

/**
 * Создание поля пересечения относительно другого.
 * Если координата поля отсчета отрицательное значение отсчет идет от правого края поля отсчета
 * @param box Поле пересечения
 * @param relative Поле отсчета
 * @param scf Коэффициент изменения размера
 */
export function createRelativeCollisionBox(
  box: CollisionBox,
  relative: CollisionBox,
  scf = 1,
): CollisionBox {
  return new CollisionBox(
    relative.x + box.x * scf + (box.x < 0 ? relative.width : 0),
    relative.y + box.y * scf + (box.y < 0 ? relative.height : 0),
    box.width * scf,
    box.height * scf,
  );
}

/**
 * Отрисовка областей пересечения при отладке
 */
export function drawCollisionBoxes(
  canvasCtx: CanvasRenderingContext2D,
  heroBox: CollisionBox,
  obstacleBox: CollisionBox,
) {
  canvasCtx.save();
  // eslint-disable-next-line no-param-reassign
  canvasCtx.strokeStyle = "#f00";
  canvasCtx.strokeRect(heroBox.x, heroBox.y, heroBox.width, heroBox.height);

  // eslint-disable-next-line no-param-reassign
  canvasCtx.strokeStyle = "#0f0";
  canvasCtx.strokeRect(
    obstacleBox.x,
    obstacleBox.y,
    obstacleBox.width,
    obstacleBox.height,
  );
  canvasCtx.restore();
}

/**
 * Пересечение двух областей
 * @param heroBox Область пересечения героя
 * @param obstacleBox Область пересечения препятствия
 * @return {boolean} Пересекаются да/нет
 */
export function boxCompare(
  heroBox: CollisionBox,
  obstacleBox: CollisionBox,
): boolean {
  return (
    heroBox.x < obstacleBox.x + obstacleBox.width &&
    heroBox.x + heroBox.width > obstacleBox.x &&
    heroBox.y < obstacleBox.y + obstacleBox.height &&
    heroBox.height + heroBox.y > obstacleBox.y
  );
}
