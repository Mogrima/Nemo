import { Bush } from './Bush.js';

export class BushObstacle extends Bush {
    constructor(game, topBoundary, fieldHeight) {
        super(game, topBoundary);
        this.canvasHeight = fieldHeight;
        this.topBoundary = topBoundary + 100 - this.spriteHeight;
        this.fieldHeight = this.canvasHeight * 0.5 - 50;
        this.y = Math.random() * this.fieldHeight + (this.topBoundary);
        this.collisionY = this.y;
    }

    // draw(context) {
    //     super.draw(context);
    //     context.save();
    //     context.strokeStyle = 'pink';
    //     context.strokeRect(0, this.topBoundary, window.innerWidth, this.fieldHeight + this.height);
    //     context.restore();
    // }

}