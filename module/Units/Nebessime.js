import { Unit } from './Unit.js';

export class Nebessime extends Unit {
    constructor(game) {
        super(game);
        this.spriteWidth = 64;
        this.spriteHeight = 67;
        this.width = 50;
        this.height = 50;

        this.collisionX = (game.width / 2 - (this.width / 2)) + 100;
        this.collisionY = game.height - this.height - 43;

        this.maxXRight = this.width + 10;
        this.maxXLeft = this.width - 10;
        this.maxTop = 232;

        // image and animation player
        this.image = document.getElementById('player2');
        this.frameX = 0;
        this.frameY = 2;
        this.maxFrame = 5;
        this.direct = 1;

        this.enemy;
    }

    update(deltaTime) {
        super.update();

        this.handleFrames();

        if (this.enemy === undefined) {
            this.maxFrame = 5;
            this.frameY = this.direct === 1 ? 5 : 0;
            this.speedX = 0;
            this.speedY = 0;
            this.enemy = this.targetEnemy();
        } else {
            if (this.enemy.collisionX < this.game.width && this.enemy.collisionX > 0) {
                const aim = this.calcAim(this, this.enemy);
                this.speedX = aim[0];
                this.speedY = aim[1];
                this.maxFrame = 4;
                if (this.enemy.collisionX - this.collisionX < 0) {
                    this.direct = 0;
                    this.frameY = 1;
                } else {
                    this.direct = 1;
                    this.frameY = 4;
                }
            }

            if (this.game.checkCollision(this.enemy, this)) {
                this.frameY = this.direct === 1 ? 6 : 2;
                this.speedX = 0;
                this.speedY = 0;
                this.enemy.speedX = 0;
                if (this.game.spriteUpdate) {
                    this.frameX++;
                    if (this.frameX > this.maxFrame) {
                        this.enemy.reset();
                        this.game.sound.collision();
                        this.enemy = undefined;
                    }
                }
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
        this.markedForDeletion = false;
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

}