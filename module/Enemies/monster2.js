import {Enemy} from './Enemy.js';

export class Monster2 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 48;
        this.height = 48;

        this.sWidth = 48;
        this.sWheight = 48;

        this.dWidth = 96;
        this.dHeight = 96;

        this.y = game.height - this.height - 90;
        this.image = document.getElementById('enemy2');
        this.frameY = 1;
        this.maxFrame = 7; 
        this.lives = 5;
        this.score = this.lives;

        
        if (this.randomDirect() === "right") {
            this.x = this.game.width;
        } else {
            this.x = 0;
            this.frameY = 0;
        }
    }
}