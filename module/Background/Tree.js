export class Tree {
    constructor(game, topBoundary) {
        this.game = game;
        this.fieldWidth = this.game.canvas.width;
        this.fieldHeight = 80;
        this.topBoundary = topBoundary;
        this.id = Math.floor(Math.random() * 10 + 1);
        this.image = document.getElementById('tree' + this.id);
        this.spriteWidth = this.image.width;
        this.spriteHeight = this.image.height;
        this.width = this.spriteWidth * this.game.ratio;
        this.height = this.spriteHeight * this.game.ratio;
        this.x = Math.random() * this.fieldWidth;
        this.y = Math.random() * this.fieldHeight + (this.topBoundary - this.height);
        this.collisionX = this.x;
        this.collisionY = this.y;
        this.spriteX = this.x;
        this.spriteY = this.y;
    }

    update() {

    }

    draw(context) {
        context.drawImage(this.image, this.spriteX, this.spriteY, this.width, this.height);
    }
}