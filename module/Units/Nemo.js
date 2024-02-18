import { Unit } from './Unit.js';
import { Farefly } from '../Farefly.js';

export class Nemo extends Unit {
    constructor(game) {
        super(game);
        this.spriteWidth = 23;
        this.spriteHeight = 36;
        this.width = this.spriteWidth * 3;
        this.height = this.spriteHeight * 3;

        this.collisionX = game.width / 2 - (this.width / 2);
        this.collisionY = game.height - this.height - 50;

        this.maxXRight = this.width + 10;
        this.maxXLeft = 0;
        this.maxTop = 242;

        // image and animation player
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 1;
        this.maxFrame = 0;

        // смещение спрайта, чтобы не было видно куска другого кадра
        this.shiftX = 1;
        this.shiftY = 1;
    }

    update() {
        super.update();
        if (this.game.health < 1) {
            this.remove();
            for (let i = 0; this.numberOfCorpuscle > 0; i++) {
                this.numberOfCorpuscle--;
                this.game.corpuscles.add(new Farefly(this.game, this.collisionX,
                    this.collisionY + this.height, '#8b00ff'));
            }
        }
        if (this.frameX < this.maxFrame) {
            this.frameX++;
        } else {
            this.frameX = 0;
        }
    }


    restart() {
        this.collisionX = this.game.width / 2 - (this.width / 2);
        this.collisionY = this.game.height - this.height - 50;
        this.spriteX = this.collisionX;
        this.spriteY = this.collisionY;
        this.frameX = 0;
        this.frameY = 1;
        this.numberOfCorpuscle = 20;
        this.splashes = [];
    }

    remove() {
        this.game.units.delete(this);
    }

}