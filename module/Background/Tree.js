export class Tree {
    constructor(fieldWidth, topBoundary) {
        this.fieldWidth = fieldWidth;
        this.fieldHeight = 80;
        this.topBoundary = topBoundary;
        this.id = Math.floor(Math.random() * (5 + 1) + 2);
        this.image = document.getElementById('tree' + this.id);
        this.spriteWidth = this.image.width;
        this.spriteHeight = this.image.height;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = Math.random() * this.fieldWidth;
        this.y = Math.random() * this.fieldHeight + (this.topBoundary - this.image.height);
        this.collisionX = this.x;
        this.collisionY = this.y;
        this.spriteX = this.x;
        this.spriteY = this.y;
    }

    update() {

    }

    draw(context) {
        context.drawImage(this.image, this.spriteX, this.spriteY);
    }
}