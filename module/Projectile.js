export class Projectile {
    constructor(game, x, y, direct) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.direct = direct;
        this.width = 16;
        this.height = 16;
        this.speed = 8;
        this.markedForDeletion = false;
        this.image = document.getElementById('projectile3');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 14;
    }
  
    update() {
        if (this.direct === "right") {
            this.x += this.speed;
            if (this.x > this.game.width * 0.9) this.markedForDeletion = true;
           
        } else if (this.direct === "left") {
            this.frameY = 1;
            this.x -= this.speed;
            if (this.x < this.game.width * 0.1) this.markedForDeletion = true;
        }
        if(this.frameX < this.maxFrame) {
            this.frameX++;
        } else {
            this.frameX = 0;
        }
        
    }
  
    draw(context) {
        // context.fillStyle = '#120a8f';
        // context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, 16 * this.frameX, this.height * this.frameY, 16, 16, this.x, this.y,  26, 26);
    }
}