import { Corpuscle } from './Corpuscle.js';

export class Farefly extends Corpuscle {
    constructor(game, x, y, color) {
        super(game);
        this.collisionX = x;
        this.collisionY = y;
        this.color = color;
        this.colorStroke = '#00008b';
    }
    update() {
        this.angle += this.va;
        // чтобы частица раскачивалась вправо-влево нужно умножить постоянно
        // увеличивающийся синус угла на массу
        this.collisionX += Math.cos(this.angle) * this.speedX;
        this.collisionY -= this.speedY * 0.5;
        if (this.collisionY < 0 - this.radius) {
            this.markedForDeletion = true;
            this.game.removeGameObjects();
        }
    }
}