import { Enemy } from './Enemy.js';

export class Monster1 extends Enemy {
    constructor(game) {
        super(game);
        this.spriteWidth = 57;
        this.spriteHeight = 88;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;

        this.image = document.getElementById('enemy1');
        this.maxFrame = 7;
        this.lives = 2;
        this.maxLives = this.lives;
        this.score = this.lives;
        this.type = 'gorgona';
    }

    update() {
        super.update();
        if (this.game.player.killed) {
            this.setState(1);
        }
        this.currentState.update();

        if (this.frameX < this.maxFrame) {
            this.frameX++;
        } else {
            this.frameX = 0;
        }
    }

    start() {
        super.start();
        this.setState(0);
    }
}