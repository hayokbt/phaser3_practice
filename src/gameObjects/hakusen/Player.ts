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

    const jumpHeight = 60
    const jumpDuration = 400

    // ジャンプアニメーション（放物線）
    this.scene.tweens.add({
      targets: this,
      y: targetY,
      duration: jumpDuration,
      ease: 'Quad.easeInOut',
      onUpdate: (tween) => {
        const progress = tween.progress
        const arc = Math.sin(progress * Math.PI)
        this.y = this.jumpStartY + (targetY - this.jumpStartY) * progress - arc * jumpHeight
      },
      onComplete: () => {
        this.isJumping = false
        if (onComplete) onComplete()
      }
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
