import { Unit } from './Unit.js';

export class Nebessime extends Unit {
    constructor(game) {
        super(game);
        this.spriteWidth = 64;
        this.spriteHeight = 67;
        this.width = this.spriteWidth * 1.5;
        this.height = this.spriteHeight * 1.5;

        this.collisionX = (game.width / 2 - (this.width / 2)) + 100;
        this.collisionY = game.height - this.height - 43;

        this.maxXRight = this.width + 10;
        this.maxXLeft = this.width - 10;
        this.maxTop = 232;

        // image and animation player
        this.image = document.getElementById('player2');
        this.frameX = 0;
        this.frameY = 2;
        this.maxFrame = 5;
        // смещение спрайта, чтобы не было видно куска другого кадра
        this.shiftX = 3;

        this.fps = 20;
        this.timer = 0;
        this.interval = 1000/this.fps;
        this.radius = 100;
        this.angle = 0;
    }

    update(deltaTime) {
        super.update();
        const vx = Math.cos(this.angle) * this.radius;
        const vy = Math.sin(this.angle) * this.radius;
        
        this.collisionX = this.game.player.collisionX + vx;
        this.collisionY = this.game.player.collisionY + vy;

        this.angle += 0.01;

        this.dx = this.game.player.collisionX - this.collisionX;
        this.dy = this.game.player.collisionY - this.collisionY;
        const angle = Math.atan2(this.dy, this.dx);

        if (angle < -1 || angle > 2) this.frameY = 1;
        else this.frameY = 3;

        if (this.frameX >= this.maxFrame) this.frameX = 0;
        if (this.timer > this.interval) {
            this.frameX++;
            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }
    }

    restart() {
        this.markedForDeletion = false;
        this.collisionX = (this.game.width / 2 - (this.width / 2)) + 100;
        this.collisionY = this.game.height - this.height - 43;
        this.spriteX = this.collisionX;
        this.spriteY = this.collisionY;
        this.frameX = 0;
        this.frameY = 2;
        this.numberOfCorpuscle = 20;
    }

}