import Phaser from 'phaser'

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })
  }

  preload() {
    // アセットをここでロード
  }

  create() {
    // ゲームオブジェクトをここで作成
    this.add.text(400, 300, 'Hello Phaser 3!', {
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5)
  }

  update() {
    // ゲームループ処理
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#2d2d2d',
  parent: 'game-container',
  scene: [GameScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  }
}

new Phaser.Game(config)
