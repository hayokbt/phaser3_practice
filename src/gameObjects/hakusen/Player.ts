import Phaser from 'phaser'

export class Player extends Phaser.GameObjects.Sprite {
  private speed: number = 4
  private isJumping: boolean = false
  private jumpStartY: number = 0

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player', 0)

    // スプライトのスケールを調整（512x1024 → 約80x160に縮小）
    this.setScale(0.15)
    this.setDepth(10)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    // 物理ボディのサイズを調整
    const body = this.body as Phaser.Physics.Arcade.Body
    body.setSize(400, 800)
    body.setOffset(50, 150)
  }

  playWalkAnimation(): void {
    this.play('walk', true)
  }

  stopAnimation(): void {
    this.stop()
    this.setFrame(1) // 中央のフレーム（立ち姿）
  }

  jump(targetY: number, onComplete?: () => void): void {
    if (this.isJumping) return

    this.isJumping = true
    this.jumpStartY = this.y

    const jumpHeight = 40  // ジャンプの高さ
    const jumpDuration = 300  // ジャンプ時間を短く（より素早く）

    // Y方向の移動（放物線）
    this.scene.tweens.add({
      targets: this,
      y: targetY,
      duration: jumpDuration,
      ease: 'Sine.easeInOut',  // より自然な動き
      onUpdate: (tween) => {
        const progress = tween.progress
        // 放物線を描く（頂点は中間点）
        const arc = Math.sin(progress * Math.PI)
        this.y = this.jumpStartY + (targetY - this.jumpStartY) * progress - arc * jumpHeight
      },
      onComplete: () => {
        this.isJumping = false
        if (onComplete) onComplete()
      }
    })

    // スケールアニメーション（押しつぶし効果）
    this.scene.tweens.add({
      targets: this,
      scaleY: 0.13,  // 少し縦に縮む
      duration: jumpDuration / 2,
      ease: 'Quad.easeOut',
      yoyo: true  // 元に戻る
    })

    // 回転アニメーション（わずかに傾ける）
    const rotationAmount = targetY > this.y ? 0.05 : -0.05
    this.scene.tweens.add({
      targets: this,
      angle: rotationAmount * 10,  // 度数に変換
      duration: jumpDuration / 2,
      ease: 'Quad.easeOut',
      yoyo: true
    })
  }

  getIsJumping(): boolean {
    return this.isJumping
  }

  moveLeft(): void {
    this.x -= this.speed
  }

  moveRight(): void {
    this.x += this.speed
  }

  setSpeed(speed: number): void {
    this.speed = speed
  }
}
