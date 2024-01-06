export class Forest {
    constructor(x, y, canvas) {
        this.canvas = canvas;
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height * 0.3;
        this.x = x;
        this.y = y;
        this.marginTop = 100;
        this.color = "#228b22";

    }
    init() {

    }

    draw(context) {
        context.save();
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.canvasWidth, this.canvasHeight);
        context.restore();
    }
}