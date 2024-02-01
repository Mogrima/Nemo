export class Tentacles {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('tentacles');
        this.collisionX = Math.random() * this.game.width;
        this.collisionY = (Math.random() * (this.game.topMargin - this.game.height * 0.82) +
                            this.game.height * 0.82);
        this.spriteWidth = 50;
        this.spriteHeight = 87;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 20;
        this.spriteX = this.collisionX;
        this.spriteY = this.collisionY;
        this.fps = 20;
        this.timer = 0;
        this.interval = 1000/this.fps;
        this.lives = 3;

        this.getFeature = this.game.prop.getFeature();
        this.feature = this.getFeature[0];
        this.featureName =  this.getFeature[1];
        this.markedForDeletion = false;
        this.propTrigger = false;

        this.text = this.getFeature[2] || null;
    }
    
    update(deltaTime, context) {
        if (this.frameX > this.maxFrame) this.frameX = 13;
        if (!this.propTrigger) {
            if (this.timer > this.interval) {
                this.frameX++;
                this.timer = 0;
            } else {
                this.timer += deltaTime;
            }
        }

        this.game.splashPool.forEach(splash => {
            if (!splash.free && this.game.checkCollision(splash, this) && !this.game.gameOver) {
                splash.markedForDeletion = true;
                splash.reset();
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
                } else {
                    this.markedForDeletion = true;
                    this.game.removeGameObjects();
                    this.propTrigger = false;
                    
                } 
            } 
            else {
                this.feature(context);
                this.markedForDeletion = true;
                this.game.removeGameObjects();
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
            this.spriteX + 14, this.spriteY, this.width, this.height);
    }
}