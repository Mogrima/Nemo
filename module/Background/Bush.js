export class Bush {
    constructor(game, topBoundary) {
        this.game = game;
        this.fieldWidth = this.game.canvas.width;
        this.fieldHeight = 80;
        this.topBoundary = topBoundary;
        this.image = document.getElementById('bushes');
        this.spriteWidth = 90;
        this.spriteHeight = 95;
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
        this.x = Math.random() * this.fieldWidth;
        this.y = (Math.random() * this.fieldHeight + (this.topBoundary - this.spriteHeight))
        this.collisionX = this.x;
        this.collisionY = this.y;
        this.frameX = Math.floor(Math.random() * 4);
        this.frameY = Math.floor(Math.random() * 2);
    }

    draw(context) {
        // context.save();
        // context.strokeStyle = 'red';
        // context.strokeRect(0, this.topBoundary - this.spriteHeight,
        // window.innerWidth, this.fieldHeight + this.spriteHeight);
        // context.restore();

        context.drawImage(this.image,
            this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height);
    }
    update() {}
}