import { Sky } from './Sky.js';

export class CanvasBackground {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;

        // sky
        // this.skyHeight = this.canvasHeight * 0.5;
        // this.skyColor = "#00416a";
        this.sky = new Sky(0, 0, canvas);

        // forest
        this.forestHeight = this.canvasHeight * 0.3;
        this.forestYstart = this.canvasHeight * 0.2;
        this.forestColor = "#228b22";

        // game field
        this.gameFieldHeight = this.canvasHeight * 0.5;
        this.gameFieldYstart = this.canvasHeight * 0.5;
        this.gameFieldColor = "#9acd32";

    }
    init() {
        this.sky.init();
    }
    
    draw(context) {
        context.save();
        // sky
        // context.fillStyle = this.skyColor;
        // context.fillRect(0, 0, this.canvasWidth, this.skyHeight);

        // forest
        context.fillStyle = this.forestColor;
        context.fillRect(0, this.forestYstart, this.canvasWidth, this.forestHeight);

        // game field
        context.fillStyle = this.gameFieldColor;
        context.fillRect(0, this.gameFieldYstart, this.canvasWidth, this.gameFieldHeight);

        this.sky.draw(context);

        context.restore();
    }
}