export const toRadians = (angle: number): number => {
  return angle * (Math.PI / 180);
}

export const toDegrees = (angle: number): number => {
  return Math.round(angle * (180 / Math.PI));
}
