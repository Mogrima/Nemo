export class Projectile {
    constructor(game, r) {
        this.game = game;
        this.spriteWidth = 16;
        this.spriteHeight = 16;
        this.width = (this.spriteWidth + 10) * this.game.ratio;
        this.height = (this.spriteHeight + 10) * this.game.ratio;

        this.collisionX = 0;
        this.collisionY = 0;
        this.spriteX = this.collisionX;
        this.spriteY = this.collisionY;

        // this.directX = direct;
        this.speed = 0;
        this.markedForDeletion = false;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 14;
        this.flightRadius = r;
        this.free = true;

        this.direct = () => {
            if (this.directX === 'left') {
                this.frameY = 1;
                this.collisionX -= this.speed;
            } else {
                this.frameY = 0;
                this.collisionX += this.speed;
            }
        };

        this.direct();
    }

    update() {
        if (!this.free) {
            if (this.directX === 'right') {
                this.collisionX += this.speed;
                if (this.collisionX > this.flightDistanceRight || this.collisionX > this.game.width) {
                    this.markedForDeletion = true;
                    this.reset();
                }

            } else if (this.directX === 'left') {
                // this.frameY = 1;
                this.collisionX -= this.speed;
                if (this.collisionX < this.flightDistanceLeft || this.collisionX < 0) {
                    this.markedForDeletion = true;
                    this.reset();
                }
            }
            this.spriteX = this.collisionX;
            this.spriteY = this.collisionY;

            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }

        }
    }

    draw(context) {
        if (!this.free) {
            context.drawImage(this.image,
                this.spriteWidth * this.frameX, this.spriteHeight * this.frameY,
                this.spriteWidth, this.spriteHeight, this.spriteX, this.spriteY,
                this.width, this.height);
        }
    }

    start(x, y, directX) {
        this.free = false;
        this.collisionX = x;
        this.collisionY = y;
        this.flightDistanceRight = x + this.r;
        this.flightDistanceLeft = x - this.r;
        this.spriteX = this.collisionX;
        this.spriteY = this.collisionY;
        this.directX = directX;
        this.direct();
        this.speed = 3;
    }
    reset() {
        this.free = true;
    }
}