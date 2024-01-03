import { Unit } from './Unit.js';


export class Nemo extends Unit {
    constructor(game) {
        super(game);
        this.width = 23 * 3;
        this.height = 36 * 3;
        this.x = game.width / 2 - (this.width / 2);
        this.y = game.height - this.height - 50;

        this.sWidth = 23;
        this.sWheight = 36;
        this.sX = 3;
        this.sY = 150;

        this.dWidth = 23 * 3;
        this.dHeight = 36 * 3;

        this.color = '#fde910';
        this.maxXRight = this.width + this.width * 2 - 15;
        this.maxXLeft = 0;

        // image and animation player
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 1;
        this.maxFrame = 0;

        this.shiftX = 1;
        this.shiftY = 1;
    }

}