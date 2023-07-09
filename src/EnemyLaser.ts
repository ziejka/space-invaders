import * as Phaser from "phaser";
import { getMoveDistance } from "./utils";
import { Hero } from "./Hero";

export class EnemyLaser extends Phaser.GameObjects.Sprite {
  private moveSpeed: number = 10;
  private time: number = 0;

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
  }

  private move(delta: number) {
    const distance = getMoveDistance(this.moveSpeed, delta);
    this.y += distance;
    if (this.y > this.scene.scale.height - 1) {
      this.destroy();
    }
  }

  detectCollision() {
    if (!this.scene) return;

    const hero = this.scene.children.getByName("hero") as Hero;
    if (!hero) return;

    const laserBounds = this.getBounds();
    const heroBounds = hero.getBounds();

    if (
      laserBounds.centerX >= heroBounds.left &&
      laserBounds.centerX <= heroBounds.right &&
      laserBounds.centerY >= heroBounds.top &&
      laserBounds.centerY <= heroBounds.bottom
    ) {
      hero.kill();
      this.destroy();
    }
  }

  update(time: number, delta: number): void {
    if (!this.active) return;

    this.time += delta;

    this.move(delta);
    this.detectCollision();

    if (this.time > 100) {
      this.flipX = !this.flipX;
      this.time = 0;
    }
  }
}
