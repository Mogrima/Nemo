import { Unit } from './Unit.js';


export class Nemo extends Unit {
    constructor(game) {
        super(game);
        this.spriteWidth = 23;
        this.spriteHeight = 36;
        this.width = this.spriteWidth * 3;
        this.height = this.spriteHeight * 3;

        this.collisionX = game.width / 2 - (this.width / 2);
        this.collisionY = game.height - this.height - 50;

        this.color = '#fde910';
        this.maxXRight = this.width + this.width * 2 - 15;
        this.maxXLeft = 0;

        // image and animation player
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 1;
        this.maxFrame = 0;

        // смещение спрайта, чтобы не было видно куска другого кадра
        this.shiftX = 1;
        this.shiftY = 1;
    }

}