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

        this.color = '#18171c';
        this.maxXRight = this.width + 10;
        this.maxXLeft = this.width - 10;

        // image and animation player
        this.image = document.getElementById('player2');
        this.frameX = 0;
        this.frameY = 2;
        this.maxFrame = 5;
        // смещение спрайта, чтобы не было видно куска другого кадра
        this.shiftX = 3;
    }

}