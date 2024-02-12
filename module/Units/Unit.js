export class Unit {
    constructor(game) {
        this.game = game;
        this.collisionX = 0;
        this.collisionY = 0;
        this.spriteX;
        this.spriteY;
        this.speedX = 0;
        this.speedY = 0;
        this.maxSpeed = 5;
        this.shiftX = 0;
        this.shiftY = 0;

        this.projectilesObject = [];

        this.warning = false;

        this.speedJump = 0;
        this.gravity = 0.5;
        this.jump = true;

        this.markedForDeletion = false;

        this.numberOfCorpuscle = 20;

    }
    update() {
        this.collisionX += this.speedX;
        this.collisionY += this.speedY;
        this.spriteX = this.collisionX;
        this.spriteY = this.collisionY;

        if (this.game.keys.has('ArrowLeft')) {
            this.speedX = -this.maxSpeed;
            this.speedY = 0;
        }
        else if (this.game.keys.has('ArrowRight')) {
            this.speedX = this.maxSpeed;
            this.speedY = 0;
        }
        else if (this.game.keys.has('ArrowUp')) {
            this.speedY = -this.maxSpeed;
            this.speedX = 0;
        }
        else if (this.game.keys.has('ArrowDown')) {
            this.speedY = this.maxSpeed;
            this.speedX = 0;
        }
        else {
            this.speedX = 0;
            this.speedY = 0;
        }

        // чтобы не выходил за границы холста
        if (this.collisionX > this.game.width - this.maxXRight) {
            this.collisionX = this.game.width - this.maxXRight;
        } else if (this.collisionX < this.maxXLeft) {
            this.collisionX = this.maxXLeft;
        }
        if (this.collisionY < this.maxTop) {
            this.collisionY = this.maxTop;
        } else if (this.collisionY > this.game.height - this.height) {
            this.collisionY = this.game.height - this.height;
        }

        this.projectilesObject = [...this.game.ammoPool, ...this.game.splashPool];
        this.projectilesObject.forEach(projectile => {
            projectile.update();
        });
    }

    draw(context) {
        // hitbox player
        context.strokeStyle = 'yellow';
        if (this.game.debug) context.strokeRect(this.collisionX, this.collisionY, this.width, this.height);
        this.projectilesObject.forEach(projectile => {
            projectile.draw(context);
        });
        context.drawImage(this.image,
            this.frameX * this.spriteWidth + this.shiftX, this.frameY * this.spriteHeight + this.shiftY,
            this.spriteWidth, this.spriteHeight,
            this.spriteX, this.spriteY, this.width, this.height);

    }

    shootTop(directX) {
        const ammo = this.game.getAmmoProjectile();
        if (this.game.projectile > 0) {
            if (ammo) {
                let x = this.collisionX;
                let y = this.collisionY + 30;
                if (directX === 'right') {
                    x = x + this.width - 25;
                }
                ammo.start(x, y, directX);
                this.game.projectile--;
            }
        }
    }

    shootSplash(directX) {
        const splash = this.game.getSplashProjectile();
        if (this.game.projectile > 0) {
            if (splash) {
                let x = this.collisionX;
                let y = this.collisionY + 30;
                if (directX === 'right') {
                    x = x + this.width - 25;
                }
                splash.start(x, y, directX);
                this.game.projectile--;
            }
        }
    }
}