export class Bush {
    constructor(fieldWidth, fieldHeight) {
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight;
        this.image = document.getElementById('bushes');
        this.spriteWidth = 80;
        this.spriteHeight = 70;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.x = Math.random() * this.fieldWidth;
        this.y = (Math.random() * (350 - 250) + 250) - this.spriteHeight;
        this.frameX = Math.floor(Math.random() * 4);
        this.frameY = Math.floor(Math.random() * 3);
    }

    draw(context) {
        context.drawImage(this.image,
            this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height);
    }
    update() {}
}