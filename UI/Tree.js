export class Tree {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height * 0.5;
        // this.spriteWidth = 200;
        // this.spriteHeight = 200;
        // this.width = this.spriteWidth;
        // this.height = this.spriteHeight;
        this.x = Math.random() * this.canvasWidth;
        this.y = (Math.random() * (this.canvasHeight * 0.5 - 50) + 50);
        this.spriteX = this.x;
        this.spriteY = this.y;
        
        this.id = Math.floor(Math.random() * (5 + 1) + 2);
        
        this.image = document.getElementById('tree' + this.id);
    }

    update() {

    }

    draw(context) {
        context.drawImage(this.image, this.spriteX, this.spriteY);
    }
}