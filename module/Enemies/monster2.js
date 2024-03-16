import { Enemy } from './Enemy.js';

export class Monster2 extends Enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 80;
        this.spriteHeight = 80;
        this.width = this.spriteWidth * 1.5;
        this.height = this.spriteHeight * 1.5;

        this.image = document.getElementById('enemy2');
        this.maxFrame = 17;
        this.lives = 5;
        this.maxLives = this.lives;
        this.score = this.lives;
        this.type = 'shadow';
        this.speedY = 0;

        this.fps = 20;
        this.timer = 0;
        this.interval = 1000 / this.fps;
    }

    update(deltaTime) {
        super.update();
        if (this.directX === 'right') {
            // Обновляем x-координату врага (уменьшаем ее на величину speedX)
            this.collisionX += this.speedX;
            // Помечаем врага как удаленного, если он полностью пересечет левую границу игрового поля
            if (this.collisionX + this.width < 0) {
                if (this === this.game.player2.enemy) {
                    this.game.player2.setState(0);
                }
                this.reset();
            }

        } else {
            this.collisionX -= this.speedX;
            if (this.collisionX - this.width > this.game.width) {
                if (this === this.game.player2.enemy) {
                    this.game.player2.setState(0);
                }
                this.reset();
            }
        }
        if (this.collisionX > 100 &&
            this.collisionX < this.game.width - 100) {
            if (this.timer > this.interval) {
                if (this.frameX < this.maxFrame) {
                    this.frameX++;
                } else {
                    this.frameX = this.maxFrame;
                }
                this.timer = 0;
            } else {
                this.timer += deltaTime;
            }
        }
    }
}