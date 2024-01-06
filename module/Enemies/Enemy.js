export class Enemy {
    constructor(game) {
        this.game = game;
        this.collisionX = 0;
        this.collisionY;
        this.spriteX;
        this.spriteY;
        this.speedX = Math.random() * -1.5 - 2.5;
        this.markedForDeletion = false;

        this.frameX = 0;
        this.frameY = 0;


        this.direct = () => {
            const randomize = Math.random();
            if (randomize < 0.5) {
                this.directX = 'right';
                this.collisionX = this.game.width;
            } else {
                this.directX = 'left';
                this.collisionX = 0;
            }
        };
        this.direct();

    }

    update() {

        if (this.directX === 'right') {
            // Обновляем x-координату врага (уменьшаем ее на величину speedX)
            this.collisionX += this.speedX;
            // Помечаем врага как удаленного, если он полностью пересечет левую границу игрового поля
            if (this.collisionX + this.width < 0) this.markedForDeletion = true;
        } else {
            this.collisionX -= this.speedX;
            if (this.collisionX + this.game.width < this.game.width) this.markedForDeletion = true;

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
        if (this.game.debug) context.strokeRect(this.spriteX, this.spriteY, this.width, this.height);
        context.drawImage(this.image,
            this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight,
            this.spriteX, this.spriteY, this.width, this.height);

        // отобразим у каждого врага его жизни
        if (this.game.debug) {
            context.fillStyle = '#ffff00';
            context.font = '20px Helvetica';
            context.fillText(this.lives, this.spriteX, this.spriteY - 5);
        }
    }
}