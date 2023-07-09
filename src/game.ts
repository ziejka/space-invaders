import * as Phaser from "phaser";
import { EnemiesContainer } from "./EnemiesContainer";
import { Hero } from "./Hero";
import { UI } from "./UI";
import { AnimationName, AssetName, EventName, SceneName } from "./names";

export default class Game extends Phaser.Scene {
  constructor() {
    super(SceneName.Game);
  }

  preload() {
    this.load.atlas(
      AssetName.Sprites,
      "assets/SpaceInvaders.png",
      "assets/sprites.json",
    );
  }

  private createAnimations() {
    for (let i = 0; i < 5; i++) {
      const prefix = `enemy${i}`;
      this.anims.create({
        key: prefix,
        frames: this.anims.generateFrameNames(AssetName.Sprites, {
          prefix: prefix,
          end: 1,
        }),
        frameRate: 2,
        repeat: -1,
      });
    }

    this.anims.create({
      key: AnimationName.Explode,
      frames: this.anims.generateFrameNames(AssetName.Sprites, {
        prefix: "explode",
        end: 2,
      }),
      frameRate: 8,
    });
  }

  create() {
    this.createAnimations();

    new UI(this);
    new EnemiesContainer(this);

    this.events.on(EventName.StartGame, () => {
      // if you won the game you'll have 2 ships for next round
      new Hero(this);
    });
  }

  update(time: number, delta: number): void {
    this.children.each((child) => {
      child.update(time, delta);
    });
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: "#000000",
  width: window.innerWidth,
  height: window.innerHeight,
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: Game,
};

const game = new Phaser.Game(config);
