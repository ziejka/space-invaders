import * as Phaser from "phaser";
import { HeroLaser } from "./HeroLaser";
import { getMoveDistance } from "./utils";
import {
  AnimationName,
  AssetName,
  EventName,
  GameObjectName,
  SpriteName,
} from "./names";

export class Hero extends Phaser.GameObjects.Sprite {
  private moveSpeed: number;
  private laser: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene) {
    super(
      scene,
      scene.scale.width / 2,
      scene.scale.height - 40,
      AssetName.Sprites,
      SpriteName.Hero,
    );
    scene.add.existing(this);
    this.setInteractive();
    this.setOrigin(0.5);
    this.moveSpeed = 10;
    this.setScale(4, 4);
    this.setName(GameObjectName.Hero);
  }

  kill() {
    const anim = this.play(AnimationName.Explode);
    anim.on("animationcomplete", () => {
      this.scene.events.emit(EventName.GameOver);
      this.destroy();
    });
  }

  private move(delta: number) {
    if (!this.scene) return;

    const cursors = this.scene.input.keyboard.createCursorKeys();
    const distance = getMoveDistance(this.moveSpeed, delta);
    if (cursors.left.isDown && this.x > 10) {
      this.x -= distance;
    } else if (cursors.right.isDown && this.x < this.scene.scale.width - 10) {
      this.x += distance;
    }
  }

  private handleShoot() {
    if (!this.scene) return;

    const spacebar = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );
    if (!this.laser?.active && Phaser.Input.Keyboard.JustDown(spacebar)) {
      this.laser = new HeroLaser(this.scene, this.x, this.y - this.height);
    }
  }

  update(time: number, delta: number) {
    this.move(delta);
    this.handleShoot();
  }
}
