import { Sky } from './Sky.js';
import { Forest } from './Forest.js';

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
        // this.forestHeight = this.canvasHeight * 0.3;
        // this.forestColor = "#228b22";
        this.forestYstart = this.canvasHeight * 0.2 + 100;
        this.forest = new Forest(canvas);
        

        // game field
        this.gameFieldHeight = this.canvasHeight * 0.5;
        this.gameFieldYstart = this.canvasHeight * 0.5 + 100;
        this.gameFieldColor = "#228b22";
        this.imagePlansBackground = document.getElementById('plansBackground');

        this.imageCity = document.getElementById('city');

    }
    init() {
        this.sky.init();
        this.forest.init();
    }
    
    draw(context) {
        context.save();
        // sky
        // context.fillStyle = this.skyColor;
        // context.fillRect(0, 0, this.canvasWidth, this.skyHeight);
        this.sky.draw(context);
        context.drawImage(this.imageCity, this.canvas.height, 175);

        // forest
        // context.fillStyle = this.forestColor;
        // context.fillRect(0, this.forestYstart, this.canvasWidth, this.forestHeight);
        

        // game field
        context.fillStyle = this.gameFieldColor;
        context.fillRect(0, this.gameFieldYstart, this.canvasWidth, this.gameFieldHeight);
        context.drawImage(this.imagePlansBackground, 0, this.gameFieldYstart - 180);
        this.forest.draw(context);

        context.restore();
    }
}