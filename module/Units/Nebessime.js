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

        this.fps = 60;
        this.timer = 0;
        this.interval = 1000/this.fps;
    }

    update(deltaTime) {
        super.update();
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