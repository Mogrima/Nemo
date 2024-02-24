import { Sky } from './Sky.js';
import { Forest } from './Forest.js';

export class CanvasBackground {
    constructor(game) {
        this.game = game;
        this.canvas = this.game.canvas;
        this.context = this.game.context;
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;

        // game field
        this.gameFieldYstart = this.canvasHeight * 0.4;
        this.gameFieldColor = '#228b22';
        this.imagePlansBackground = document.getElementById('plansBackground');
 
        this.imageCity = document.getElementById('city');
        this.imageCityWidth = 414;
        this.imageCityHeight = 48;
        this.patternGrass = this.context.createPattern(this.imagePlansBackground, 'repeat');
        
        this.sky = new Sky(canvas);
        this.forest = new Forest(this.canvasWidth, this.gameFieldYstart);

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
            this.gameFieldYstart - this.imageCityHeight - 80);

        // game field
        context.fillStyle = this.patternGrass;
        context.fillRect(0, this.gameFieldYstart - 80, this.canvasWidth, this.canvasHeight);

        context.restore();
    }
}