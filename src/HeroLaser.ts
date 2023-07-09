import * as Phaser from "phaser";
import { getMoveDistance, isIntersecting } from "./utils";
import { AssetName, GameObjectName, SpriteName } from "./names";
import { Enemy } from "./Enemy";

export class HeroLaser extends Phaser.GameObjects.Sprite {
  private moveSpeed: number = 15;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, AssetName.Sprites, SpriteName.HeroLaser);
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

    enemies.each((enemy: Enemy) => {
      if (isIntersecting(this, enemy)) {
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
