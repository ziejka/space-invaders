import * as Phaser from "phaser";
import { getMoveDistance } from "./utils";
import { GameObjectName } from "./names";
import { Enemy } from "./Enemy";

export class HeroLaser extends Phaser.GameObjects.Sprite {
  private moveSpeed: number = 15;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    this.setOrigin(0.5);
    this.setScale(4, 4);
    this.x += this.width / 4;
  }

  private move(delta: number) {
    const distance = getMoveDistance(this.moveSpeed, delta);
    this.y -= distance;
    if (this.y < 0) {
      this.destroy();
    }
  }

  detectCollision() {
    if (!this.scene) return;

    const enemies = this.scene.children.getByName(
      GameObjectName.Enemies,
    ) as Phaser.GameObjects.Container;

    const laserBounds = this.getBounds();
    enemies.each((enemy: Enemy) => {
      const enemyBounds = enemy.getBounds();

      if (
        laserBounds.centerX >= enemyBounds.left &&
        laserBounds.centerX <= enemyBounds.right &&
        laserBounds.centerY >= enemyBounds.top &&
        laserBounds.centerY <= enemyBounds.bottom
      ) {
        enemy.kill();
        this.destroy();
      }
    });
  }

  update(time: number, delta: number): void {
    if (!this.scene) return;
    if (!this.active) return;

    this.move(delta);
    this.detectCollision();
  }
}
