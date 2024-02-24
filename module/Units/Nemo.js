import { Unit } from './Unit.js';
import { Farefly } from '../Farefly.js';

export class Nemo extends Unit {
    constructor(game) {
        super(game);
        this.spriteWidth = 23;
        this.spriteHeight = 36;
        this.width = this.spriteWidth * 3;
        this.height = this.spriteHeight * 3;

        this.collisionX = game.width / 2 - (this.width / 2);
        this.collisionY = game.height - this.height - 50;

        this.maxXRight = this.width + 10;
        this.maxXLeft = 0;
        this.maxTop = 242;

        // image and animation player
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 1;
        this.maxFrame = 0;

        // смещение спрайта, чтобы не было видно куска другого кадра
        this.shiftX = 1;
        this.shiftY = 1;
    }

    update() {
        super.update();

        if (this.game.keys.has('ArrowLeft')) {
            this.speedX = -this.maxSpeed;
            this.speedY = 0;
        } else if (this.game.keys.has('ArrowRight')) {
            this.speedX = this.maxSpeed;
            this.speedY = 0;
        } else if (this.game.keys.has('ArrowUp')) {
            this.speedY = -this.maxSpeed;
            this.speedX = 0;
        } else if (this.game.keys.has('ArrowDown')) {
            this.speedY = this.maxSpeed;
            this.speedX = 0;
        } else {
            this.speedX = 0;
            this.speedY = 0;
        }

        if (this.game.health < 1) {
            this.remove();
            for (let i = 0; this.numberOfParticles > 0; i++) {
                this.numberOfParticles--;
                this.game.particles.add(new Farefly(this.game, this.collisionX,
                    this.collisionY + this.height, '#8b00ff'));
            }
        }
        if (this.frameX < this.maxFrame) {
            this.frameX++;
        } else {
            this.frameX = 0;
        }
    }

    draw(context) {
        super.draw(context);
        if (this.game.debug) {
            context.save();
            context.strokeStyle = 'red';
            context.strokeRect(0, this.maxTop + this.height, this.game.width, this.game.height - this.height);
            context.restore();
        }
        context.drawImage(this.image,
            this.frameX * this.spriteWidth + this.shiftX, this.frameY * this.spriteHeight + this.shiftY,
            this.spriteWidth, this.spriteHeight,
            this.spriteX, this.spriteY, this.width, this.height);
    }


    restart() {
        this.collisionX = this.game.width / 2 - (this.width / 2);
        this.collisionY = this.game.height - this.height - 50;
        this.spriteX = this.collisionX;
        this.spriteY = this.collisionY;
        this.frameX = 0;
        this.frameY = 1;
        this.numberOfParticles = 20;
        this.splashes = [];
    }

}