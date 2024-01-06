import { Projectile } from '../Projectile.js';

export class Unit {
    constructor(game) {
        this.game = game;
        this.collisionX = 0;
        this.collisionY;
        this.spriteX;
        this.spriteY;
        this.speedX = 0;
        this.maxSpeed = 5;
        this.shiftX = 0;
        this.shiftY = 0;

        this.projectiles = [];

        this.warning = false;

        this.speedY = 0;
        this.gravity = 0.5;
        this.jump = true;


    }
    update() {
        this.collisionX += this.speedX;
        this.spriteX = this.collisionX;
        this.spriteY = this.collisionY;
        // гравитация
        this.collisionY += this.speedY;
        // тело всегда падает
        this.speedY += this.gravity;

        // чтобы тело не падало ниже земли
        if (this.collisionY + this.height >= this.game.height - 50) {
            this.collisionY = this.game.height - this.height - 50;
            this.speedY = 0;
        }
        // ограничение вертикального ускорения
        if (this.speedY > 25) this.speedY = 25;

        if (this.game.keys.includes('ArrowLeft')) this.speedX = -this.maxSpeed;
        else if (this.game.keys.includes('ArrowRight')) this.speedX = this.maxSpeed;
        else this.speedX = 0;

        if (this.collisionY === this.game.height - this.height - 50) {
            this.jump = true;
        }

        if (this.game.handlerJump && this.jump) {
            this.speedY = -11;
            this.jump = false;
        }

        // чтобы не выходил за границы холста
        if (this.collisionX > this.game.width - this.maxXRight) {
            this.collisionX = this.game.width - this.maxXRight;
        } else if (this.collisionX < this.maxXLeft) {
            this.collisionX = this.maxXLeft;
        }

        this.projectiles.forEach(pr => {
            pr.update();
        });
        this.projectiles = this.projectiles.filter(pr => !pr.markedForDeletion);

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
        if (this.game.debug) context.strokeRect(this.collisionX, this.collisionY, this.width, this.height);
        this.projectiles.forEach(pr => {
            pr.draw(context);
        });
        context.drawImage(this.image,
            this.frameX * this.spriteWidth  + this.shiftX, this.frameY * this.spriteHeight  + this.shiftY,
            this.spriteWidth, this.spriteHeight,
            this.spriteX, this.spriteY, this.width, this.height);

    }

    shootTop(x, y, direct) {
        if (this.game.ammo > 0) {
            this.projectiles.push(new Projectile(this.game, x, y, direct));
            this.game.ammo--;
        }
    }
}