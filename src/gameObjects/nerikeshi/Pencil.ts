import Phaser from 'phaser';

export class Pencil {
    private graphics: Phaser.GameObjects.Graphics;
    private isDrawing: boolean = false;
    private lastPoint: { x: number; y: number } | null = null;

    constructor(scene: Phaser.Scene) {
        this.graphics = scene.add.graphics();
        // デフォルトの線スタイル
        this.graphics.lineStyle(4, 0x333333, 1);
        // 既定では描画が最前面に来るように
        this.graphics.setDepth(0);
    }

    start(x: number, y: number) {
        this.isDrawing = true;
        this.lastPoint = { x, y };
        this.graphics.beginPath();
        this.graphics.moveTo(x, y);
    }

    move(x: number, y: number) {
        if (!this.isDrawing || !this.lastPoint) return;
        // 線を引く
        this.graphics.lineTo(x, y);
        this.graphics.strokePath();
        this.lastPoint = { x, y };
    }

    end() {
        if (!this.isDrawing) return;
        this.isDrawing = false;
        this.lastPoint = null;
        this.graphics.closePath();
    }

    // シーン切替などで描画をクリアしたい場合に呼ぶ
    clear() {
        this.graphics.clear();
        // 再度デフォルトスタイルを設定
        this.graphics.lineStyle(4, 0x333333, 1);
    }

    // 任意で線の太さ・色を変えられるユーティリティ
    setStyle(width: number, color: number, alpha: number = 1) {
        this.graphics.lineStyle(width, color, alpha);
    }
}
