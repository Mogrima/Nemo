import {Enemy} from './Enemy.js';

export class Monster1 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 131;
        this.height = 131;

        this.sWidth = 32;
        this.sWheight = 28;

        this.dWidth = 131;
        this.dHeight = 131;

        this.y = game.height - this.height - 25;
        this.image = document.getElementById('enemy3');
        this.frameY = 0;
        this.maxFrame = 7;
        this.lives = 2;
        this.score = this.lives;

        if (this.randomDirect() === "right") {
            this.x = this.game.width;
            this.frameY = 1;
        } else {
            this.x = 0;
        }
    }


}