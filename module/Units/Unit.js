import { Projectile } from '../Projectile.js';
import { Health } from '../Health.js';
export class Unit {
    constructor(game) {
        this.game = game;
        this.speedX = 0;
        this.maxSpeed = 5;
        this.shiftX = 0;
        this.shiftY = 0;

        this.projectiles = [];
        this.healths = [];

        this.warning = false;

        this.speedY = 0;
        this.gravity = 0.5;
        this.jump = true;


    }
    update() {
        this.x += this.speedX;
        // гравитация
        this.y += this.speedY;
        // тело всегда падает
        this.speedY += this.gravity;

        // чтобы тело не падало ниже земли
        if (this.y + this.height >= this.game.height - 50) {
            this.y = this.game.height - this.height - 50;
            this.speedY = 0;
        }
        // ограничение вертикального ускорения
        if (this.speedY > 25) this.speedY = 25;

        if (this.game.keys.includes('ArrowLeft')) this.speedX = -this.maxSpeed;
        else if (this.game.keys.includes('ArrowRight')) this.speedX = this.maxSpeed;
        else this.speedX = 0;

        if (this.y === this.game.height - this.height - 50) {
            this.jump = true;
        }

        if (this.game.handlerJump && this.jump) {
            this.speedY = -11;
            this.jump = false;
        }

        // чтобы не выходил за границы холста
        if (this.x > this.game.width - this.maxXRight) {
            this.x = this.game.width - this.maxXRight;
        } else if (this.x < this.maxXLeft) {
            this.x = this.maxXLeft;
        }

        this.projectiles.forEach(pr => {
            pr.update();
        });
        this.projectiles = this.projectiles.filter(pr => !pr.markedForDeletion);

        this.healths.forEach(hl => {
            hl.update();
        });
        this.healths = this.healths.filter(hl => !hl.markedForDeletion);

        // sprite animation
        if (this.frameX < this.maxFrame) {
            this.frameX++;
        } else {
            this.frameX = 0;
        }
    }

    draw(context) {
        // hitbox player
        context.strokeStyle = 'yellow';
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        this.projectiles.forEach(pr => {
            pr.draw(context);
        });
        context.drawImage(this.image, this.frameX * this.sWidth + this.shiftX,
            this.frameY * this.sWheight + this.shiftY, this.sWidth, this.sWheight,
            this.x, this.y, this.dWidth, this.dHeight);

        this.healths.forEach(hl => {
            hl.draw(context);
        });

    }

    shootTop(x, y, direct) {
        if (this.game.ammo > 0) {
            this.projectiles.push(new Projectile(this.game, x, y, direct));
            this.game.ammo--;
        }
    }

    healthTop(x, y) {
        if (this.game.health > 0) {
            this.healths.push(new Health(this.game, x, y));
            this.game.health--;
        }
    }
}