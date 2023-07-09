export function getMoveDistance(delta: number, speed: number): number {
  return Math.round(speed * ((delta * 24) / 1000));
}

export function isIntersecting(
  a: Phaser.GameObjects.Sprite,
  b: Phaser.GameObjects.Sprite,
): boolean {
  const aBounds = a.getBounds();
  const bBounds = b.getBounds();

  return (
    aBounds.centerX >= bBounds.left &&
    aBounds.centerX <= bBounds.right &&
    aBounds.centerY >= bBounds.top &&
    aBounds.centerY <= bBounds.bottom
  );
}
