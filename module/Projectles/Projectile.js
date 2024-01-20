export class Projectile {
    constructor(game, x, y, direct) {
        this.game = game;
        this.spriteWidth = 16;
        this.spriteHeight = 16;
        this.width = this.spriteWidth + 10;
        this.height = this.spriteHeight + 10;

        this.collisionX = x;
        this.collisionY = y;
        this.spriteX = this.collisionX;
        this.spriteY = this.collisionY;

        this.direct = direct;
        this.speed = 8;
        this.markedForDeletion = false;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 14;
    }

    update() {
        if (this.direct === 'right') {
            this.collisionX += this.speed;
            if (this.collisionX > this.flightDistanceRight) this.markedForDeletion = true;

        } else if (this.direct === 'left') {
            this.frameY = 1;
            this.collisionX -= this.speed;
            if (this.collisionX < this.flightDistanceLeft) this.markedForDeletion = true;
        }
        this.spriteX = this.collisionX;
        this.spriteY = this.collisionY;

        if (this.frameX < this.maxFrame) {
            this.frameX++;
        } else {
            this.frameX = 0;
        }

    }

    draw(context) {
        // context.fillStyle = '#120a8f';
        // context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image,
            this.spriteWidth * this.frameX, this.spriteHeight * this.frameY,
            this.spriteWidth, this.spriteHeight, this.spriteX, this.spriteY,
            this.width, this.height);
    }
}