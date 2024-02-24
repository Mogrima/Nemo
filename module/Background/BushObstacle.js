import { Bush } from "./Bush.js";

export class BushObstacle extends Bush {
    constructor(fieldWidth, topBoundary, fieldHeight) {
        super(fieldWidth, topBoundary);
        this.canvasHeight = fieldHeight;
        this.topMargin = 232;
        this.maxTopBoundary = this.topMargin - this.canvasHeight * 0.8;
        this.minTopBoundary = this.canvasHeight * 0.82;
        this.y = (Math.random() * this.maxTopBoundary + this.minTopBoundary);
        this.collisionY = this.y;
    }
}