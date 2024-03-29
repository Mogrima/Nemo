import { Spark } from '../Spark.js';

export class Tentacles {
    constructor(game) {
        this.game = game;
        this.image = document.getElementById('tentacles');
        this.spriteWidth = 50;
        this.spriteHeight = 87;
        this.width = 25;
        this.height = this.spriteHeight;
        this.topBoundary = this.game.height * 0.4 + 50 - this.height;
        this.fieldHeight = this.game.height * 0.5;
        this.collisionX = Math.random() * this.game.width;
        this.collisionY = Math.random() * this.fieldHeight + (this.topBoundary);
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 20;
        this.spriteX = this.collisionX;
        this.spriteY = this.collisionY;
        this.fps = 20;
        this.timer = 0;
        this.interval = 1000 / this.fps;
        this.lives = 3;

        this.getFeature;
        this.feature;
        this.featureName;

        this.text;
    }

    start() {
        this.getFeature = this.game.prop.getFeature();
        this.feature = this.getFeature[0];
        this.featureName = this.getFeature[1];

        this.text = this.getFeature[2] || null;
    }

    update(deltaTime, context) {
        this.handleFrames(deltaTime);

        this.game.splashPool.forEach(splash => {
            if (!splash.free && this.game.checkCollision(splash, this) && !this.game.gameOver) {
                splash.reset();
                if (this.lives > 0) this.lives--;
                this.game.particles.add(new Spark(this.game, this.collisionX,
                    this.collisionY + this.height * 0.5, '#0000ff'));
            }
        });

        if (this.propTrigger()) {
            if (this.featureName === 'strangeMessage') {
                if (!this.game.toggleMessage) {
                    if (this.frameX > 0) {
                        this.game.sound.tentacles();
                        if (this.timer > this.interval) {
                            this.frameX--;
                            this.timer = 0;
                        } else {
                            this.timer += deltaTime;
                        }

                    } else {
                        this.game.sound.strangeMessageSound.play();
                        this.feature(context);
                    }

                } else {
                    this.remove();
                    for (let i = 0; i < 5; i++) {
                        this.game.particles.add(new Spark(this.game, this.collisionX,
                            this.collisionY + this.height, 'gold'));
                    }
                }
            } else {
                if (this.frameX > 0) {
                    this.game.sound.tentacles();
                    if (this.timer > this.interval) {
                        this.frameX--;
                        this.timer = 0;
                    } else {
                        this.timer += deltaTime;
                    }

                } else {
                    this.feature(context);
                    this.remove();
                    for (let i = 0; i < 5; i++) {
                        this.game.particles.add(new Spark(this.game, this.collisionX,
                            this.collisionY + this.height, '#0000ff'));
                    }
                }

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
            context.strokeStyle = 'blue';
            context.strokeRect(0,this.topBoundary, this.game.width, this.fieldHeight + this.height);
            context.restore();
        }
        context.drawImage(this.image,
            this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight,
            this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight);
    }

    propTrigger() {
        return ((this.feature !== null) &&
            (!this.gameOver) &&
            (this.lives < 1));

    }

    handleFrames(deltaTime) {
        if (this.frameX >= this.maxFrame) this.frameX = 13;
        if (!this.propTrigger()) {
            if (this.timer > this.interval) {
                this.frameX++;
                this.timer = 0;
            } else {
                this.timer += deltaTime;
            }
        }
    }

    remove() {
        this.game.props.delete(this);
    }
}