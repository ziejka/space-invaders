import * as Phaser from "phaser";
import { getMoveDistance } from "./utils";
import { AnimationName, AssetName, EventName, SpriteName } from "./names";
import { EnemyLaser } from "./EnemyLaser";

export class Enemy extends Phaser.GameObjects.Sprite {
  private initPosition: number;
  private moveSpeed: number = 10;
  private timer: number = 0;
  private direction: number = 1;
  laser: EnemyLaser;

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
    this.initPosition = Math.floor(x);
    this.name = Math.floor(Math.random() * 1000).toString();
  }

  move(delta: number) {
    const boundary = 20;
    const distance = getMoveDistance(this.moveSpeed, delta);
    this.x += distance * this.direction;

    if (this.x > this.initPosition + boundary) {
      this.direction = -1;
    }
    if (this.x < this.initPosition - boundary) {
      this.direction = 1;
    }
  }

  kill() {
    const anim = this.play(AnimationName.Explode);
    this.scene.events.emit(EventName.EnemyShoot);

    anim.on("animationcomplete", () => {
      this.destroy();
    });
  }

  shoot() {
    new EnemyLaser(
      this.scene,
      this.x,
      this.y + this.height,
      AssetName.Sprites,
      SpriteName.EnemyLaser,
    );
  }

  update(time: number, delta: number) {
    this.timer += delta;
    if (this.timer > 500) {
      this.move(delta);
      this.timer = 0;
    }
  }
}
