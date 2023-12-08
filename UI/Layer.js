export class Layer {
    constructor(game, image, speedModifer) {
        this.game = game;
        this.image = image;
        this.speedModifer = speedModifer;
        this.width = 928;
        this.height = 793;
        this.x = 0;
        this.y = -193;
    }
    update() {
        if (this.game.keys.includes('ArrowRight') && (this.x > -1200 * (this.speedModifer / 3))) {
            this.x -= this.game.speed * this.speedModifer;
        } else if (this.game.keys.includes('ArrowLeft') && (this.x <= 0 - this.speedModifer)) {
            this.x += this.game.speed * this.speedModifer;
        }
    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y);
        context.drawImage(this.image, this.x + this.width, this.y);
        context.drawImage(this.image, this.x + this.width + this.width, this.y);
    }
}