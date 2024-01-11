export class Tree {
    constructor(fieldWidth, fieldHeight) {
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight;
        this.id = Math.floor(Math.random() * (5 + 1) + 2);
        this.image = document.getElementById('tree' + this.id);
        this.spriteWidth = this.image.width;
        this.spriteHeight = this.image.height;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = Math.random() * this.fieldWidth;
        this.y = (Math.random() * (350 - 250) + 250) - this.image.height;
        this.spriteX = this.x;
        this.spriteY = this.y;
        console.log(this.fieldHeight);
    }

    update() {

    }

    draw(context) {
        context.drawImage(this.image, this.spriteX, this.spriteY);
    }
}