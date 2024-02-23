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

        this.numberOfCorpuscle = 20;

    }
    update() {
        this.collisionX += this.speedX;
        this.collisionY += this.speedY;
        this.spriteX = this.collisionX;
        this.spriteY = this.collisionY;

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
    }

    shootTop(directX) {
        const ammo = this.game.getAmmoProjectile();
        if (this.game.projectile > 0) {
            if (ammo) {
                let x = this.collisionX;
                const y = this.collisionY + 30;
                if (directX === 'right') {
                    x = x + this.width - 25;
                }
                ammo.start(x, y, directX);
                this.game.sound.hit();
                this.game.projectile--;
            }
        }
    }

    shootSplash(directX) {
        const splash = this.game.getSplashProjectile();
        if (this.game.projectile > 0) {
            if (splash) {
                let x = this.collisionX;
                const y = this.collisionY + 30;
                if (directX === 'right') {
                    x = x + this.width - 25;
                }
                splash.start(x, y, directX);
                this.game.sound.anotherHit();
                this.game.projectile--;
            }
        }
    }

    remove() {
        this.game.units.delete(this);
    }
}