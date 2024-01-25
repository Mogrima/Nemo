import { Enemy } from './Enemy.js';

export class Monster1 extends Enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 57;
        this.spriteHeight = 88;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;

        this.image = document.getElementById('enemy1');
        this.frameY = 1;
        this.maxFrame = 7;
        this.lives = 2;
        this.maxLives = this.lives;
        this.score = this.lives;
        this.type = 'gorgona';

        if (this.directX === 'right') this.frameY = 4;
    }


}