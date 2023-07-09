export function getMoveDistance(delta: number, speed: number): number {
  return Math.round(speed * ((delta * 24) / 1000));
}
