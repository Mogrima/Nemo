export class Cloud {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height * 0.5;
        this.width = 100;
        this.height = 53;
        this.speedX = Math.random() * 2 + 0.5;
        this.cloudColor = '#ffffe0';
        this.cloudImage = document.getElementById('cloud');
        this.x = Math.random() * this.canvasWidth;
        this.y = (Math.random() * this.canvasHeight * 0.5);
    }

    update() {
        console.log(this.y)
        this.x -= this.speedX;
        if (this.x + this.width < 0) {
            this.x = this.canvasWidth + this.width +
            Math.random() * this.canvasWidth * 0.5;
            this.collisionY = Math.random() * this.canvasHeight * 0.5;
        }
    }

    draw(context) {
        context.drawImage(this.cloudImage, this.x, this.y);
    }
}