export class Enemy {
    constructor(game) {
        this.game = game;
        this.y = 0;
        this.speedX = Math.random() * -1.5 - 2.5;
        this.markedForDeletion = false;

        this.frameX = 0;
        this.frameY = 0;
    }

    randomDirect() {
        const randomize = Math.random();
        if (randomize < 0.5) this.direct = "right";
        else this.direct = "left";
        return this.direct;
    }

    update() {
        // console.log(this.speedX);

        if (this.direct === "right") {
            // Обновляем x-координату врага (уменьшаем ее на величину speedX)
            this.x += this.speedX;
            // Помечаем врага как удаленного, если он полностью пересечет левую границу игрового поля
            if (this.x + this.width < 0) this.markedForDeletion = true;
        } else {
            this.x -= this.speedX;
            if (this.x + this.game.width < this.game.width) this.markedForDeletion = true;
            
        }

        if(this.frameX < this.maxFrame) {
            this.frameX++;
        }  else {
            this.frameX = 0;
        }

    }

    draw(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.sWidth, this.frameY * this.sWheight, this.sWidth, this.sWheight, this.x, this.y, this.dWidth, this.dHeight);

        // отобразим у каждого врага его жизни
        if (this.game.debug) {
            context.fillStyle = '#ffff00';
            context.font = '20px Helvetica';
            context.fillText(this.lives, this.x, this.y - 5);
        }
    }
}