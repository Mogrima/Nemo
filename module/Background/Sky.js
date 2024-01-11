import { Cloud } from './Cloud.js';
import { Star } from './Star.js';

export class Sky {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height * 0.5;
        this.skyColor = "#00416a";

        // moon
        this.moonColor = '#eae6ca';
        this.moonSize = 100;
        this.moonX = this.canvasWidth * 0.5;

        // clouds
        this.MaxClouds = 15;
        this.clouds = [];

        // stars
        this.MaxStars = 30;
        this.stars = [];

    }
    init() {
        for (let i = 0; i < this.MaxClouds; i++) {
            this.clouds.push(new Cloud(this.canvasWidth, this.canvasHeight));
        }
        for (let i = 0; i < this.MaxStars; i++) {
            this.stars.push(new Star(this.canvasWidth, this.canvasHeight));
        }
    }

    draw(context) {
        
        context.save();
        
        context.fillStyle = this.skyColor;
        context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        // stars
        this.stars.forEach(star => {
            star.draw(context);
        });
        // moon
        context.beginPath();
        context.fillStyle = this.moonColor;
        context.arc(this.moonX, 0, this.moonSize, 0, Math.PI * 2);
        context.fill();

        // clouds
        this.clouds.forEach(cloud => {
            cloud.draw(context);
            cloud.update();
        });
        context.restore();
    }
}