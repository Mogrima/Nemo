import {Unit} from './Unit.js';

export class Nebessime extends Unit {
    constructor(game) {
        super(game);
        this.width = 64 * 1.5;
        this.height = 67 * 1.5;
        this.x = (game.width / 2 - (this.width / 2)) + 100;
        this.y = game.height - this.height - 43;

        this.sWidth = 64;
        this.sWheight = 67;

        this.dWidth = 64 * 1.5;
        this.dHeight = 67 * 1.5;

        this.color = "#18171c";
        this.maxXRight = this.width + 10;
        this.maxXLeft = this.width - 10;

        // image and animation player
        this.image = document.getElementById('player2');
        this.frameX = 0;
        this.frameY = 2;
        this.maxFrame = 5;
    }
    
}