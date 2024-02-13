export class Corpuscle {
    constructor(game, x, y, color) {
        this.game = game;
        this.collisionX = x;
        this.collisionY = y;
        this.color = color;
        this.colorStroke = '#ffff00';
        // от 5 до 15
        this.radius = Math.floor(Math.random() * 10 + 5);
        // от -3 до 3
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 2 + 0.5;
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.01;
    }

    draw(context) {
        context.save();
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.collisionX, this.collisionY, this.radius, 0, Math.PI * 2);
        context.fill();
        context.strokeStyle= this.colorStroke;
        context.stroke();
        context.restore();
    }

    remove() {
        this.game.corpuscles.delete(this);
    }
}