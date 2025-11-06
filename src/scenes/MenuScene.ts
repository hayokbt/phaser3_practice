import Phaser from 'phaser'
import { Button } from '../gameObjects/common/Button'

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' })
  }

  create() {
    const { width, height } = this.cameras.main

    // 背景色
    this.cameras.main.setBackgroundColor('#f5f5f0')

    // タイトル「ステージ選択」
    this.add.text(width / 2, 230, 'ステージ選択', {
      fontSize: '72px',
      color: '#000000',
      fontFamily: 'Arial, sans-serif',
      fontStyle: 'bold'
    }).setOrigin(0.5)

    // 青いアンダーライン
    this.add.rectangle(
      width / 2,
      290,
      300,
      6,
      0x5b9dd9
    )

    // ステージボタン配置（2列2行）
    const buttonWidth = 700
    const buttonHeight = 150
    const horizontalSpacing = 800
    const verticalSpacing = 200
    const startY = 480

    const stages = [
      { name: 'ステージ1 - ねり消し作り', color: 0x5b9dd9, scene: 'NeriKeshiScene', col: 0, row: 0 },
      { name: 'ステージ2 - 消しピン', color: 0x7cb342, scene: 'KeshiPinScene', col: 1, row: 0 },
      { name: 'ステージ3 - 白線歩き', color: 0xe57373, scene: 'HakusenScene', col: 0, row: 1 },
      { name: 'ステージ4 - 油つなげ', color: 0xffb74d, scene: 'OilConnectScene', col: 1, row: 1 }
    ]

    stages.forEach(stage => {
      const x = width / 2 - horizontalSpacing / 2 + stage.col * horizontalSpacing
      const y = startY + stage.row * verticalSpacing

      new Button(this, {
        x: x,
        y: y,
        width: buttonWidth,
        height: buttonHeight,
        text: stage.name,
        backgroundColor: stage.color,
        textColor: '#ffffff',
        fontSize: '42px',
        onClick: () => this.startGame(stage.scene)
      })
    })

    // 下部メッセージ
    this.add.text(width / 2, height - 120, '懐かしい遊びを楽しもう', {
      fontSize: '32px',
      color: '#999999',
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0.5)

    // 戻るボタン
    const backButton = this.add.text(100, height - 100, '← 戻る', {
      fontSize: '36px',
      color: '#666666',
      fontFamily: 'Arial, sans-serif'
    }).setOrigin(0, 0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => backButton.setColor('#000000'))
    .on('pointerout', () => backButton.setColor('#666666'))
    .on('pointerdown', () => this.goBack())
  }

  private startGame(sceneKey: string): void {
    this.scene.start(sceneKey)
  }

  private goBack(): void {
    this.scene.start('TitleScene')
  }
}
