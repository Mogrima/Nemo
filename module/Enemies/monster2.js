import {Enemy} from './Enemy.js';

export class Monster2 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 80;
        this.height = 70;

        this.sWidth = 80;
        this.sWheight = 70;

        this.dWidth = 80 * 1.5;
        this.dHeight = 70 * 1.5;

        this.y = game.height - this.height - 80;
        this.image = document.getElementById('enemy2');
        this.frameY = 4;
        this.maxFrame = 3; 
        this.lives = 5;
        this.score = this.lives;

        
        if (this.randomDirect() === "right") {
            this.x = this.game.width;
        } else {
            this.x = 0;
            this.frameY = 5;
        }
    }
}