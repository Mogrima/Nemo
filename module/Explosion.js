export class Explosion {
    constructor(game, x, y) {
        this.game = game;
        this.collisionX = x;
        this.collisionY = y;
        this.image = document.getElementById('particle');
        this.frameX = Math.floor(Math.random() * 4);
        this.frameY = Math.floor(Math.random() * 3);
        this.spriteSize = 64;
        this.sizeModifer = (Math.random() * 0.5 + 0.5).toFixed(1);
        this.size = this.spriteSize * this.sizeModifer;
        this.width = this.size;
        this.height = this.size;
        // разбор деталей от игрока по горизонтали
        this.speedX = Math.random() * 6 - 3;
        // движение частиц по вертикали случайное число от 0 до - 15, поэтому частицы всегда будут двигаться вверх
        this.speedY = Math.random() * - 15;
        // сила тяжести, чтобы частицы подали вниз
        this.gravity = 0.5;
        // вращение
        this.angle = 0;
        // скорсть вращения от - 0.2 до 0.1
        this.va = Math.random() * 0.2 - 0.1;
        // кол-во отскоков
        this.bounced = 0;
        this.bottomBounceBoundary = Math.random() * 80 + 60;
        this.isHit = false;
    }

    update() {
        // угол изменяется под вращением
        this.angle += this.va;
        // вертикальная скорость уменьшается под гравитацией
        this.speedY += this.gravity;
        this.collisionX -= this.speedX + this.game.speed;
        this.collisionY += this.speedY;
        if (this.collisionY > this.game.height + this.size || this.collisionX < 0 - this.size) {
            this.remove();
        }
        // подпрыгивание частиц
        if (this.collisionY > this.game.height - this.bottomBounceBoundary && this.bounced < 2) {
            this.bounced++;
            this.speedY *= -0.5;
        }
        if (this.game.checkCollision(this, this.game.player)) {
            if (!this.isHit) {
                this.game.health--;
                this.isHit = true;
                if (this.game.health <= 0) {
                    this.game.gameOver = true;
                }
            }
        }
    }
    draw(context) {
        context.save();
        context.translate(this.collisionX, this.collisionY);
        context.rotate(this.angle);
        context.drawImage(this.image, this.frameX * this.spriteSize, this.frameY * this.spriteSize,
            this.spriteSize, this.spriteSize, this.size * -0.5, this.size * -0.5, this.size, this.size);
        context.restore();
    }

    remove() {
        this.game.explosions.delete(this);
    }
}