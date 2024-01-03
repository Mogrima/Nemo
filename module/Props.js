export class Props {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('layer14');
        this.collisionX = Math.random() * this.game.width;
        this.collisionY = this.game.height * 0.76;
        this.spriteWidth = 25;
        this.spriteHeight = 87;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 20;
        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY;
        this.fps = 30;
        this.timer = 0;
        this.interval = 1000/this.fps;
    }

    update(deltaTime) {
        if (this.frameX > this.maxFrame) this.frameX = 13;
        if(this.timer > this.interval) {
            this.frameX++;
            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }

    }

    draw(context) {
        context.drawImage(this.image,
            this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight,
            this.spriteX, this.spriteY, this.width, this.height);
    }
}