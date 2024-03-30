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
        this.imagePlansBackground = document.getElementById('plansBackground');

        this.imageCity = document.getElementById('city');
        this.imageCityWidth = 414;
        this.imageCityHeight = 48;
        this.patternGrass = this.context.createPattern(this.imagePlansBackground, 'repeat');

        this.sky = new Sky(this.canvas);
        this.forest = new Forest(this.canvas, this.gameFieldYstart);

        // Overlay
        this.overlay1 = document.getElementById('overlay1');
        this.overlayWidth1 = 200;
        this.overlayHeight1 = 121;
        this.overlay2 = document.getElementById('overlay2');
        this.overlayWidth2 = 180;
        this.overlayHeight2 = 146;
        this.overlay3 = document.getElementById('overlay3');
        this.overlayWidth3 = 170;
        this.overlayHeight3 = 135;
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

    drawOverlay(context) {
        context.drawImage(this.overlay1,
            0, this.game.height - this.overlayHeight1,
            this.overlayWidth1, this.overlayHeight1);
        context.drawImage(this.overlay2,
            this.game.width * 0.5 - this.overlayWidth2 * 0.5,
            this.game.height - this.overlayHeight2,
            this.overlayWidth2, this.overlayHeight2);
        context.drawImage(this.overlay3,
            this.game.width - this.overlayWidth3,
            this.game.height - this.overlayHeight3,
            this.overlayWidth3, this.overlayHeight3);
    }
}