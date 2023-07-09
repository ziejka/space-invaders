import * as Phaser from "phaser";
import { EventName, SceneName } from "./names";

export class UI extends Phaser.GameObjects.Container {
  private score: number = 0;
  private scoreText: Phaser.GameObjects.Text;
  private button: Phaser.GameObjects.Text;
  private infoText: Phaser.GameObjects.Text;
  winLooseText: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    super(scene);
    scene.add.existing(this);
    this.createInfoText();
    this.createWinLooseText();
    this.createScore();
    this.createStartButton();
    this.scene.events.on(EventName.EnemyShoot, this.updateScore, this);
    this.scene.events.on(EventName.GameOver, this.gameOver, this);
  }

  createWinLooseText() {
    this.winLooseText = this.scene.add.text(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2 - 100,
      "You Won!",
      {
        fontSize: "32px",
        color: "#fff",
        align: "center",
      },
    );
    this.winLooseText.setOrigin(0.5);
    this.winLooseText.setVisible(false);
  }

  createInfoText() {
    this.infoText = this.scene.add.text(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2,
      "Press Spacebar to shoot\nUse arrow keys to move",
      {
        fontSize: "32px",
        color: "#fff",
        align: "center",
      },
    );
    this.infoText.setOrigin(0.5);
  }

  gameOver() {
    this.button.setVisible(true);
    this.infoText.setVisible(true);
    this.winLooseText.setText("You Lost!");
    this.winLooseText.setVisible(true);
    this.score = 0;
  }

  startGame() {
    this.infoText.setVisible(false);
    this.score = 0;
    this.button.setVisible(false);
    this.scene.events.emit(EventName.StartGame);
    this.winLooseText.setVisible(false);
  }

  gameWon() {
    this.button.setVisible(true);
    this.infoText.setVisible(true);
    this.winLooseText.setText("You Won!");
    this.winLooseText.setVisible(true);
  }

  createStartButton() {
    this.button = this.scene.add.text(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2 + 100,
      "Start",
      {
        fontSize: "32px",
        color: "#fff",
        backgroundColor: "#5f5f5f",
        padding: {
          left: 15,
          right: 15,
          top: 10,
          bottom: 10,
        },
      },
    );
    this.button.setOrigin(0.5);
    this.button.setInteractive();
    this.button.on("pointerdown", this.startGame, this);
  }

  createScore() {
    this.scoreText = this.scene.add.text(10, 10, "Score: 0", {
      fontSize: "24px",
      color: "#fff",
    });
  }

  updateScore() {
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);

    if (this.score === 500) {
      this.gameWon();
    }
  }
}
