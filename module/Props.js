export class Props {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('tentacles');
        this.collisionX = Math.random() * this.game.width;
        this.collisionY = (Math.random() * (this.game.topMargin - this.game.height * 0.82) +
                            this.game.height * 0.82);
        this.spriteWidth = 25;
        this.spriteHeight = 87;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 20;
        this.spriteX = this.collisionX;
        this.spriteY = this.collisionY;
        this.fps = 30;
        this.timer = 0;
        this.interval = 1000/this.fps;
        this.lives = 3;

        this.feature = null;
        this.featureName = null;
        this.markedForDeletion = false;
        this.propTrigger = false;

        this.uncannyText = ['You have been chosen. They will come soon.',
                'The end is near. Make preparations.',
                'The drop off has been made. You`ve been warned.',
                'The flashing light was just a test. You`ll have plenty of warning next time.',
                'They`re coming soon. Maybe you should think twice about opening the fear.'];
        this.text = this.uncannyText[Math.floor(Math.random() * 5)];
    }
    
    update(deltaTime, context) {
        if (this.frameX > this.maxFrame) this.frameX = 13;
        if (this.timer > this.interval) {
            this.frameX++;
            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }

        this.game.player.projectiles.forEach(projectile => {
            if (this.game.checkCollision(projectile, this)) {
                projectile.markedForDeletion = true;
                if (this.lives > 0) this.lives--;
            }
        });

        if (this.propTrigger === false) {
            if ((this.feature !== null) && (!this.gameOver)) {
            if (this.lives < 1) this.propTrigger = true;
        }
           }

           if (this.propTrigger !== false) {
            if (this.featureName === 'strangeMessage') {
                if (!this.game.keys.includes('x')) {
                    this.feature(context);
                } else if (this.game.keys.includes('x')) {
                    this.feature(context);
                    this.markedForDeletion = true;
                    this.propTrigger = false;
                    
                } 
            } 
            else {
                this.feature(context);
                this.markedForDeletion = true;
                this.propTrigger = false;
            }
    }

    }

    draw(context) {
        if (this.game.debug) {
            context.save();
            context.fillStyle = 'yellow';
            context.fillText(this.lives, this.spriteX, this.spriteY - 20);
            context.fillText(this.featureName, this.spriteX, this.spriteY);
            context.strokeRect(this.collisionX, this.collisionY, this.width, this.height);
            context.restore();
        }
        context.drawImage(this.image,
            this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight,
            this.spriteX, this.spriteY, this.width, this.height);
    }

    strangeMessage(context) {
        context.fillStyle = 'black';
        context.fillRect(this.game.width * 0.5, this.game.height * 0.5, 200, 200);
        context.fillStyle = 'white';
        context.fillText(this.text, this.game.width * 0.5, this.game.height * 0.5);
       
    }

    lossOfHealth() {
        this.game.health = Math.trunc(this.game.health / 2);
        console.log('Lose health');
        if (this.game.health <= 0) {
            this.game.gameOver = true;
        }
    }

    upHealth() {
        this.game.health = this.game.maxHealth;
        console.log('Up health');
    }

    escape() {
        console.log('The escape!');
        this.game.win = true;
        this.game.gameOver = true;
    }

    reboot() {
        this.game.addProps();
    }
}