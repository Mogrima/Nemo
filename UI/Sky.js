import { Cloud } from './Cloud.js';

export class Sky {
    constructor(x, y, canvas) {
        // this.width = width;
        // this.height = height * 0.5;
        this.canvas = canvas;
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height * 0.5;
        this.x = x;
        this.y = y;
        this.marginTop = 100;
        this.skyColor = "#00416a";

        // moon
        this.moonColor = '#eae6ca';
        this.moonSize = 100;
        this.moonX = this.canvasWidth * 0.5;

        // clouds
        this.MaxClouds = 15;
        this.clouds = [];

    }
    init() {
        for (let i = 0; i < this.MaxClouds; i++) {
            this.clouds.push(new Cloud(this.canvas));
        }
    }

    draw(context) {
        
        context.save();
        
        context.fillStyle = this.skyColor;
        context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        // moon
        context.beginPath();
        context.fillStyle = this.moonColor;
        context.arc(this.moonX, 0, this.moonSize, 0, Math.PI * 2);
        context.fill();

        // clouds
        this.clouds.forEach(cloud => {
            cloud.draw(context);
            cloud.update();
        })
        
        
        context.restore();
    }
}