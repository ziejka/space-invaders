import * as Phaser from "phaser";
import { Enemy } from "./Enemy";
import { AssetName, EventName, GameObjectName } from "./names";

export class EnemiesContainer extends Phaser.GameObjects.Container {
  private timer: number = 0;
  isGameOver: boolean;

  constructor(scene: Phaser.Scene) {
    super(scene);
    scene.add.existing(this);
    this.setName(GameObjectName.Enemies);
    this.isGameOver = true;
    this.scene.events.on(EventName.GameOver, this.gameOver, this);
    this.scene.events.on(EventName.StartGame, this.startGame, this);
  }

  startGame() {
    this.createEnemies();
    this.isGameOver = false;
  }

  gameOver() {
    this.isGameOver = true;
    this.removeAll(true);
  }

  createEnemies() {
    const gap = this.scene.scale.width / 10;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 10; j++) {
        const prefix = `enemy${i}`;
        const enemy = new Enemy(
          this.scene,
          gap * j + gap / 2,
          45 * i + 80,
          AssetName.Sprites,
          `${prefix}0`,
        );

        enemy.play(prefix);
        this.add(enemy);
      }
    }
  }

  update(time: number, delta: number) {
    this.timer += delta;

    this.each((enemy: Enemy) => {
      enemy.update(time, delta);
    });

    if (this.timer > 1000) {
      this.timer = 0;
      this.randomShoot();
    }
  }

  randomShoot() {
    if (this.isGameOver) return;

    const randomChild = Phaser.Utils.Array.GetRandom(this.getAll()) as Enemy;
    randomChild.shoot();
  }
}
