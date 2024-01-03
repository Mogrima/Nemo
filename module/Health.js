export class Health {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 13;
        this.markedForDeletion = false;
    }

    draw(context) {
        context.fillStyle = '#120a8f';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}