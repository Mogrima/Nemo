import { Explosion } from '../Explosion.js';

export class Enemy {
    constructor(game) {
        this.game = game;
        this.collisionX;
        this.collisionY;
        this.spriteX;
        this.spriteY;
        this.speedX;
        this.speedY;
        this.fieldHeight;
        this.topBoundary;

        this.frameX;
        this.frameY;
        this.free = true;
        this.margin = 0;


        this.direct = () => {
            const randomize = Math.random();
            if (randomize < 0.5) {
                this.directX = 'right';
                this.collisionX = this.game.width + this.margin;
                if (this.type === 'gorgona') this.frameY = 4;
                else if (this.type === 'shadow') this.frameY = 0;
            } else {
                this.directX = 'left';
                this.collisionX = -this.margin;
                if (this.type === 'gorgona') this.frameY = 1;
                else if (this.type === 'shadow') this.frameY = 1;
            }
        };

    }

    update() {
        if (!this.free) {
            this.spriteX = this.collisionX;
            this.spriteY = this.collisionY;
            // Проверим, не столкнолся ли враг с главным игроком (player)
            if (this.game.checkCollision(this.game.player, this)
                && !this.game.player.markedForDeletion && !this.game.gameOver) {
                // если столкновение произошло, помечаем врага как удаленного
                for (let i = 0; i < this.score; i++) {
                    this.game.explosions.add(new Explosion(this.game, this.collisionX + this.width * 0.5,
                        this.collisionY + this.height * 0.5));
                }
                if (this === this.game.player2.enemy) {
                    this.game.player2.setState(0);
                }
                this.reset();
                this.game.sound.collision();

                this.game.health--;
            }

            // для всех активных пуль (ammo) также проверим условие столкновения
            // пули с врагом.
            this.game.ammoPool.forEach(ammo => {
                if (!ammo.free && this.game.checkCollision(this, ammo)) {
                    this.lives--; // уменьшаем жизни врага на единицу
                    // если столкновение произошло, помечаем снаряд как удаленный
                    this.game.explosions.add(new Explosion(this.game, this.collisionX + this.width * 0.5,
                        this.collisionY + this.height * 0.5));
                    ammo.reset();
                }

            });
            if (this.lives <= 0) {
                if (this.type === 'shadow') {
                    this.game.sound.deathEnemy2();
                } else {
                    this.game.sound.deathEnemy();
                }
                if (this === this.game.player2.enemy) {
                    this.game.player2.setState(0);
                }
                this.reset(); // удаляем врага
                for (let i = 0; i < this.score; i++) {
                    this.game.explosions.add(new Explosion(this.game, this.collisionX + this.width * 0.5,
                        this.collisionY + this.height * 0.5));
                }
                // увеличиваем количество очков главного игрока
                if (!this.game.gameOver) this.game.score += this.score;
                if (this.game.isWin()) this.game.gameOver = true; // проверяем условие победы
            }

        }
    }

    draw(context) {
        if (!this.free) {
            if (this.game.debug) context.strokeRect(this.spriteX, this.spriteY, this.width, this.height);
            context.drawImage(this.image,
                this.frameX * this.spriteWidth, this.frameY * this.spriteHeight,
                this.spriteWidth, this.spriteHeight,
                this.spriteX, this.spriteY, this.width, this.height);

            // отобразим у каждого врага его жизни
            if (this.game.debug) {
                context.fillStyle = '#ffff00';
                context.font = '20px Helvetica';
                context.fillText(this.lives, this.spriteX, this.spriteY - 5);
            }
            // context.strokeStyle = 'blue';
            // context.strokeRect(0, this.topBoundary, this.game.width, this.fieldHeight + this.height);
        }
    }

    reset() {
        this.free = true;
        this.game.enemies.delete(this);
    }

    start() {
        this.free = false;
        this.frameX = 0;
        this.direct();
        this.fieldHeight = this.game.height * 0.5;
        this.topBoundary = this.game.height * 0.4 + 50 - this.height;
        this.collisionY = Math.random() * this.fieldHeight + (this.topBoundary);
        this.speedX = Math.random() * -1.5 - 0.5;
        this.speedY = 0;
        this.lives = this.maxLives;
    }
}