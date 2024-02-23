import { Unit } from './Unit.js';
import { Hunting, Attack, Idle, Destroy } from './State.js';

export class Nebessime extends Unit {
    constructor(game) {
        super(game);
        this.image = document.getElementById('player2');
        this.spriteWidth = 64;
        this.spriteHeight = 67;
        this.width = 50;
        this.height = 50;
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
    }

    update(deltaTime) {
        super.update();
        this.currentState.update();
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

    }

    draw(context) {
        super.draw(context);
        context.drawImage(this.image,
            this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight,
            this.spriteX - this.width * 0.5, this.spriteY - this.height,
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

    calcAim(a, b) {
        const dx = a.collisionX - b.collisionX;
        const dy = a.collisionY - b.collisionY;
        const distance = Math.hypot(dx, dy);
        const aimX = dx / distance * -1;
        const aimY = dy / distance * -1;
        return [aimX, aimY, dx, dy];
    }

    handleFrames() {
        if (this.game.spriteUpdate) {
            if (this.frameX < this.maxFrame) {
                this.frameX++
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
        this.numberOfCorpuscle = 20;
        this.enemy = undefined;
    }

    remove() {
        this.game.units.delete(this);
    }

}