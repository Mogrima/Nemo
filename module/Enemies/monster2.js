import { Enemy } from './Enemy.js';

export class Monster2 extends Enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 80;
        this.spriteHeight = 70;
        this.width = this.spriteWidth * 1.5;
        this.height = this.spriteHeight * 1.5;

        this.image = document.getElementById('enemy2');
        this.frameY = 0;
        this.maxFrame = 17;
        this.lives = 5;
        this.maxLives = this.lives;
        this.score = this.lives;
        this.type = 'shadow';


        if (this.directX === 'right') this.frameY = 4;
    }
}