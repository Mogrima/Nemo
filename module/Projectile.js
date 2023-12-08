export class Projectile {
    constructor(game, x, y, direct) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.direct = direct;
        this.width = 20;
        this.height = 13;
        this.speed = 8;
        this.markedForDeletion = false;
    }
  
    update() {
        if (this.direct === "right") {
            this.x += this.speed;
            if (this.x > this.game.width * 0.9) this.markedForDeletion = true;
           
        } else if (this.direct === "left") {
            this.x -= this.speed;
            if (this.x < this.game.width * 0.1) this.markedForDeletion = true;
        }
        
    }
  
    draw(context) {
        context.fillStyle = '#120a8f';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}