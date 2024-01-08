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
        // this.y = (Math.random() * (this.canvasHeight * 0.5 - 50) + 50);

        
        this.id = Math.floor(Math.random() * (5 + 1) + 2);
        
        this.image = document.getElementById('tree' + this.id);
        this.y = (Math.random() * (350 - 250) + 250) - this.image.height;
        this.spriteX = this.x;
        this.spriteY = this.y;
        
        console.log(this.canvasHeight)
    }

    update() {

    }

    draw(context) {
        context.drawImage(this.image, this.spriteX, this.spriteY);
    }
}