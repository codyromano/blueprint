import Position from "../models/Position";

export function convertPixelCoordsToPosition(x: number, y: number): Position {
  const vw = (100 * x) / window.innerWidth;
  const vh = (100 * y) / window.innerHeight;
  return { vw, vh, x, y };
}

export const clamp = (value: number, min: number, max: number) => {
  value = Math.max(min, value);
  value = Math.min(max, value); 
  return value;
};

type ValidatedObject<T> = {
  [K in keyof T]: T[K];
};

