import Position from "../models/Position";

export function convertPixelCoordsToPosition(x: number, y: number): Position {
  const vw = (100 * x) / window.innerWidth;
  const vh = (100 * y) / window.innerHeight;
  return { vw, vh, x, y };
}