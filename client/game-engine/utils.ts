import { CollisionBox } from "./models";

/**
 * Get random number.
 * @param min
 * @param max
 */
export function getRandomNum(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Vibrate on mobile devices.
 * @param duration Duration of the vibration in milliseconds.
 */
export function vibrate(IS_MOBILE: boolean, duration: number) {
  if (IS_MOBILE && window.navigator.vibrate) {
    window.navigator.vibrate(duration);
  }
}

/**
 * Create canvas element.
 * @param container Element to append canvas to.
 * @param width
 * @param height
 * @param opt_classname
 * @return HTMLCanvasElement
 */
export function createCanvas(
  container: HTMLElement,
  width: number,
  height: number,
  classname: string[],
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.className = classname.join(" ");
  canvas.width = width;
  canvas.height = height;
  container.appendChild(canvas);
  return canvas;
}

/**
 * Decodes the base 64 audio to ArrayBuffer used by Web Audio.
 * @param base64String
 */
export function decodeBase64ToArrayBuffer(
  base64String: string,
): ArrayBufferLike {
  const len = (base64String.length / 4) * 3;
  const str = atob(base64String);
  const arrayBuffer = new ArrayBuffer(len);
  const bytes = new Uint8Array(arrayBuffer);

  for (let i = 0; i < len; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Return the current timestamp.
 * @return number
 */
export function getTimeStamp(): number {
  if (window.performance && window.performance.now)
    return window.performance.now();
  return new Date().getTime();
}

/**
 * Adjust the collision box.
 * @param  box The original box.
 * @param adjustment Adjustment box.
 * @return CollisionBox - The adjusted collision box object.
 */
export function createAdjustedCollisionBox(
  box: CollisionBox,
  adjustment: CollisionBox,
): CollisionBox {
  return new CollisionBox(
    box.x + adjustment.x,
    box.y + adjustment.y,
    box.width,
    box.height,
  );
}

/**
 * Draw the collision boxes for debug.
 */
export function drawCollisionBoxes(
  canvasCtx: CanvasRenderingContext2D,
  tRexBox: CollisionBox,
  obstacleBox: CollisionBox,
) {
  canvasCtx.save();
  // #QT canvasCtx.strokeStyle = "#f00";
  canvasCtx.strokeRect(tRexBox.x, tRexBox.y, tRexBox.width, tRexBox.height);

  // #QT canvasCtx.strokeStyle = "#0f0";
  canvasCtx.strokeRect(
    obstacleBox.x,
    obstacleBox.y,
    obstacleBox.width,
    obstacleBox.height,
  );
  canvasCtx.restore();
}

/**
 * Compare two collision boxes for a collision.
 * @param {CollisionBox} tRexBox
 * @param {CollisionBox} obstacleBox
 * @return {boolean} Whether the boxes intersected.
 */
export function boxCompare(
  tRexBox: CollisionBox,
  obstacleBox: CollisionBox,
): boolean {
  let crashed = false;

  // Axis-Aligned Bounding Box method.Z
  if (
    tRexBox.x < obstacleBox.x + obstacleBox.width &&
    tRexBox.x + tRexBox.width > obstacleBox.x &&
    tRexBox.y < obstacleBox.y + obstacleBox.height &&
    tRexBox.height + tRexBox.y > obstacleBox.y
  ) {
    crashed = true;
  }

  return crashed;
}
