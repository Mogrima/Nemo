import {Projectile} from '../Projectile.js';
import {Health} from '../Health.js';
export class Unit {
    constructor(game) {
        this.game = game;
        this.speedX = 0;
        this.maxSpeed = 5;


        this.projectiles = [];
        this.healths = [];
        

    }
    update() {
        this.x += this.speedX;

        if (this.game.keys.includes('ArrowLeft')) this.speedX = -this.maxSpeed;
        else if (this.game.keys.includes('ArrowRight')) this.speedX = this.maxSpeed;
        else this.speedX = 0;

        // чтобы не выходил за границы холста
        if (this.x > this.game.width - this.maxXRight) {
            this.x = this.game.width - this.maxXRight;
        }
        else if (this.x < this.maxXLeft) {
            this.x = this.maxXLeft;
        }

        this.projectiles.forEach(pr => { pr.update(); });
        this.projectiles = this.projectiles.filter(pr => !pr.markedForDeletion);

        this.healths.forEach(hl => { hl.update(); });
        this.healths = this.healths.filter(hl => !hl.markedForDeletion);

        // sprite animation
        if(this.frameX < this.maxFrame) {
            this.frameX++;
        } else {
            this.frameX = 0;
        }
    }
   
    draw(context) {
        // hitbox player
        context.strokeStyle = "yellow";
       
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.sWidth, this.frameY * this.sWheight, this.sWidth, this.sWheight, this.x, this.y, this.dWidth, this.dHeight);
        this.projectiles.forEach(pr => { pr.draw(context); });

        this.healths.forEach(hl => { hl.draw(context); });

    }

    shootTop(x, y, direct) {
        if (this.game.ammo > 0) {
            this.projectiles.push(new Projectile(this.game, x, y, direct));
            this.game.ammo--;
        }
    }

    healthTop(x, y) {
        if (this.game.health > 0) {
            this.healths.push(new Health(this.game, x, y));
            this.game.health--;
        }
    }
} 