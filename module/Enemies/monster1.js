import {Enemy} from './Enemy.js';

export class Monster1 extends Enemy {
    constructor(game) {
        super(game);
        this.width = 57;
        this.height = 88;

        this.sWidth = 57;
        this.sWheight = 88;

        this.dWidth = 57;
        this.dHeight = 88;

        this.y = game.height - this.height - 75;
        this.image = document.getElementById('enemy1');
        this.frameY = 1;
        this.maxFrame = 7;
        this.lives = 2;
        this.score = this.lives;
        this.type = 'gorgona'

        if (this.randomDirect() === "right") {
            this.x = this.game.width;
            this.frameY = 4;
        } else {
            this.x = 0;
        }
    }


}