import { Sky } from './Sky.js';
import { Forest } from './Forest.js';

export class CanvasBackground {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;

        this.sky = new Sky(canvas);
        this.forest = new Forest(canvas);

        // game field
        this.gameFieldHeight = this.canvasHeight * 0.5;
        this.gameFieldYstart = this.canvasHeight * 0.5 + 100;
        this.gameFieldColor = '#228b22';
        this.imagePlansBackground = document.getElementById('plansBackground');

        this.imageCity = document.getElementById('city');
        this.imageCityWidth = 414;
        this.imageCityHeight = 48;

    }
    init() {
        this.sky.init();
        this.forest.init();
    }

    draw(context) {
        context.save();
        this.sky.draw(context);
        context.drawImage(this.imageCity,
            this.canvasWidth * 0.5 - this.imageCityWidth * 0.5,
            this.gameFieldYstart - this.imageCityHeight);

        // game field
        context.fillStyle = this.gameFieldColor;

        context.fillRect(0, this.gameFieldYstart, this.canvasWidth, this.gameFieldHeight);
        context.drawImage(this.imagePlansBackground, 0, this.gameFieldYstart - 180);
        // this.forest.draw(context);

        context.restore();
    }
}