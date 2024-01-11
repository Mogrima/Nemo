export class Cloud {
    constructor(fieldWidth, fieldHeight) {
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight * 0.5;
        this.spriteWidth = 100;
        this.spriteHeight = 53;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.speedX = Math.random() * + 0.5;
        this.cloudImage = document.getElementById('cloud');
        this.x = Math.random() * this.fieldWidth;
        this.y = (Math.random() * this.fieldHeight * 0.5);
    }

    update() {
        this.x -= this.speedX;
        if (this.x + this.width < 0) {
            this.x = this.fieldWidth + this.width +
            Math.random() * this.fieldWidth * 0.5;
            this.y = Math.random() * this.fieldHeight * 0.5;
        }
    }

    draw(context) {
        context.drawImage(this.cloudImage, this.x, this.y);
    }
}