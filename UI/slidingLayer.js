export class SlidingLayer {
    constructor(game) {
        this.game = game;
        this.width = 25;
        this.height = 90;

        this.sWidth = 25;
        this.sWheight = 90;

        this.dWidth = 25;
        this.dHeight = 90;

        this.y = game.height - this.height;
        this.x = 0;
        this.speedX = -1.5;
        this.image = document.getElementById('layer14');
        this.frameY = 0;
        this.maxFrame = 7;

        this.markedForDeletion = false;
    }

    update() {
        this.x -= this.speedX;
        if (this.x > this.game.width) this.markedForDeletion = true;
        if(this.frameX < this.maxFrame) {
            this.frameX++;
        }  else {
            this.frameX = 0;
        }
    }

    draw(context) {
        context.drawImage(this.image, this.frameX * this.sWidth, this.frameY * this.sWheight, this.sWidth, this.sWheight, this.x, this.y, this.dWidth, this.dHeight);
    }
}