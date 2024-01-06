export class Star {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height * 0.5;
        this.size = 1.5;
        this.color = '#ffff66';
        this.x = Math.random() * this.canvasWidth;
        this.y = (Math.random() * this.canvasHeight * 0.5);
    }

    update() {

    }

    draw(context) {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }
}