import { Unit } from './Unit.js';
import { Hunting, Attack, Idle, Destroy } from './State.js';

export class Nebessime extends Unit {
    constructor(game) {
        super(game);
        this.image = document.getElementById('player2');
        this.spriteWidth = 64;
        this.spriteHeight = 67;
        this.width = 50;
        this.height = 40;
        this.maxXRight = this.width + 10;
        this.maxXLeft = this.width - 10;
        this.maxTop = 232;
        this.states = [new Idle(game, this),
            new Hunting(game, this),
            new Attack(game, this),
            new Destroy(game, this)];

        this.collisionX;
        this.collisionY;
        this.frameX;
        this.frameY;
        this.maxFrame;
        this.direct;
        this.enemy;
        this.currentState;
        this.attackInterval;
        this.attackTimer;
    }

    update(deltaTime) {
        super.update();
        this.currentState.update(deltaTime);
        if (this.enemy === undefined) {
            this.setState(0);
        } else {
            if (this.enemy.collisionX < this.game.width && this.enemy.collisionX > 0) {
                this.setState(1);
            }

            if (this.game.checkCollision(this.enemy, this)) {
                this.setState(2);
            }
        }
        // Регулировка изображений внутри фреймов во время движения
        // if (this.game.keys.has('ArrowLeft')) {
        //     this.speedX = -this.maxSpeed;
        //     this.speedY = 0;
        //     this.frameY = 1;
        // } else if (this.game.keys.has('ArrowRight')) {
        //     this.speedX = this.maxSpeed;
        //     this.speedY = 0;
        //     this.frameY = 4;
        // } else if (this.game.keys.has('ArrowUp')) {
        //     this.speedY = -this.maxSpeed;
        //     this.speedX = 0;
        // } else if (this.game.keys.has('ArrowDown')) {
        //     this.speedY = this.maxSpeed;
        //     this.speedX = 0;
        // } else {
        //     this.speedX = 0;
        //     this.speedY = 0;
        // }

        // this.handleFrames();
    }

    draw(context) {
        super.draw(context);
        context.drawImage(this.image,
            this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight,
            this.spriteX - this.width * 0.5, this.spriteY - this.height - 20,
            this.spriteWidth * 1.5, this.spriteHeight * 1.5);
    }

    setState(state) {
        this.currentState = this.states[state];
        this.currentState.start();
    }

    targetEnemy() {
        const iterator = this.game.enemies.values();
        return iterator.next().value;
    }

    handleFrames() {
        if (this.game.spriteUpdate) {
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        }
    }

    restart() {
        this.setState(0);
        this.collisionX = (this.game.width / 2 - (this.width / 2)) + 100;
        this.collisionY = this.game.height - this.height - 43;
        this.spriteX = this.collisionX;
        this.spriteY = this.collisionY;
        this.direct = 1;
        this.frameX = 0;
        this.frameY = 2;
        this.numberOfParticles = 20;
        this.enemy = undefined;
        this.attackInterval = 250;
        this.attackTimer = 0;
    }

}