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
        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY;
        this.fps = 30;
        this.timer = 0;
        this.interval = 1000/this.fps;

        this.feature = null;
        this.markedForDeletion = false;
    }

    update(deltaTime) {
        if (this.frameX > this.maxFrame) this.frameX = 13;
        if (this.timer > this.interval) {
            this.frameX++;
            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }

    }

    draw(context) {
        context.drawImage(this.image,
            this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
            this.spriteWidth, this.spriteHeight,
            this.spriteX, this.spriteY, this.width, this.height);
    }

    strangeMessage() {
        console.log('Your soul is main');
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
    }

    reboot() {
        this.game.addProps();
    }
}