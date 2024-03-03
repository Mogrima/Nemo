import { Farefly } from '../Farefly.js';

class State {
    constructor(game, unit) {
        this.game = game;
        this.unit = unit;
    }
}

export class Idle extends State {
    start() {
        this.unit.maxFrame = 5;
        this.unit.frameY = this.unit.direct === 1 ? 5 : 0;
        this.unit.speedX = 0;
        this.unit.speedY = 0;
    }

    update() {
        this.unit.handleFrames();
        this.unit.enemy = this.unit.targetEnemy();
    }

}

export class Hunting extends State {
    start() {
        this.unit.maxFrame = 4;
    }

    update() {
        this.unit.handleFrames();
        const aim = this.unit.calcAim(this.unit, this.unit.enemy);
        this.unit.speedX = aim[0];
        this.unit.speedY = aim[1];

        if (this.unit.enemy.collisionX - this.unit.collisionX < 0) {
            this.unit.direct = 0;
            this.unit.frameY = 1;
        } else {
            this.unit.direct = 1;
            this.unit.frameY = 4;
        }
    }

}

export class Attack extends State {
    start() {
        this.unit.maxFrame = 3;
        this.unit.frameY = this.unit.direct === 1 ? 6 : 2;
        this.unit.speedX = 0;
        this.unit.speedY = 0;
        this.unit.enemy.speedX = 0;
    }

    update(deltaTime) {
        if (this.game.spriteUpdate) {
            if (this.unit.attackTimer < this.unit.attackInterval) {
                this.unit.frameX++;
                if (this.unit.frameX > this.unit.maxFrame) {
                    this.unit.frameX = 0;
                }
                this.unit.attackTimer += deltaTime;
            } else {
                this.unit.enemy.reset();
                this.game.sound.collision();
                this.unit.enemy = undefined;
                this.unit.attackTimer = 0;
            }
        }
    }

}

export class Destroy extends State {
    start() {
        this.unit.maxFrame = 6;
        this.unit.frameY = 3;
        this.unit.speedX = 0;
        this.unit.speedY = 0;
        this.unit.enemy.speedX = 0;
    }

    update() {
        this.unit.handleFrames();
        if (this.game.spriteUpdate) {
            this.unit.frameX++;
            if (this.unit.frameX > this.unit.maxFrame) {
                this.unit.enemy.reset();
                this.game.sound.collision();
                this.unit.enemy = undefined;
                this.unit.remove();
                for (let i = 0; this.unit.numberOfParticles > 0; i++) {
                    this.unit.numberOfParticles--;
                    this.game.particles.add(new Farefly(this.game, this.unit.collisionX,
                        this.unit.collisionY + this.unit.height, '#8b00ff'));
                }
            }
        }
    }

}