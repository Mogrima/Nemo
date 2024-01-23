import { Particle } from "../Particle.js";

export class Enemy {
    constructor(game) {
        this.game = game;
        this.collisionX = 0;
        this.collisionY = (Math.random() * (this.game.topMargin - this.game.height * 0.82) +
                            this.game.height * 0.82);
        this.spriteX;
        this.spriteY;
        this.speedX = Math.random() * -1.5 - 2.5;
        this.markedForDeletion = false;

        this.frameX = 0;
        this.frameY = 0;
        this.free = true;
        this.margin = 300;


        this.direct = () => {
            const randomize = Math.random();
            if (randomize < 0.5) {
                this.directX = 'right';
                this.collisionX = this.game.width + this.margin;
                if (this.type === 'gorgona') this.frameY = 4;
                else if (this.type === 'shadow') this.frameY = 4;
            } else {
                this.directX = 'left';
                this.collisionX = -this.margin;
                if (this.type === 'gorgona') this.frameY = 1;
                else if (this.type === 'shadow') this.frameY = 5;
            }
        };
        this.direct();

    }

    update() {
        if (!this.free) {
            if (this.directX === 'right') {
                // Обновляем x-координату врага (уменьшаем ее на величину speedX)
                this.collisionX += this.speedX;
                // Помечаем врага как удаленного, если он полностью пересечет левую границу игрового поля
                if (this.collisionX + this.width < 0) {
                    this.markedForDeletion = true;
                    this.game.removeGameObjects();
                    this.reset();
                }
    
            } else {
                this.collisionX -= this.speedX;
                if (this.collisionX - this.width > this.game.width) {
                    this.markedForDeletion = true;
                    this.game.removeGameObjects();
                    this.reset();
                }
            }
            this.spriteX = this.collisionX;
            this.spriteY = this.collisionY;
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
    
            // Проверим, не столкнолся ли враг с главным игроком (player)
            if (this.game.checkCollision(this.game.player, this)) {
                // если столкновение произошло, помечаем врага как удаленного
                this.markedForDeletion = true;
                for (let i = 0; i < this.score; i++) {
                    this.game.particles.push(new Particle(this.game, this.collisionX + this.width * 0.5,
                        this.collisionY + this.height * 0.5));
                }
                this.game.removeGameObjects();
                this.reset();
    
                this.game.health--;
            }
            // для всех активных пуль (ammo) также проверим условие столкновения
            // пули с врагом.
            this.game.player.ammunition.forEach(ammo => {
                if (this.game.checkCollision(ammo, this)) {
                    this.lives--; // уменьшаем жизни врага на единицу
                    // если столкновение произошло, помечаем снаряд как удаленный
                    this.game.particles.push(new Particle(this.game, this.collisionX + this.width * 0.5,
                        this.collisionY + this.height * 0.5));
                        ammo.markedForDeletion = true;
                        ammo.reset();
                }

            });
            if (this.lives <= 0) {
                this.markedForDeletion = true; 
                this.game.removeGameObjects(); // удаляем врага
                for (let i = 0; i < this.score; i++) {
                    this.game.particles.push(new Particle(this.game, this.collisionX + this.width * 0.5,
                        this.collisionY + this.height * 0.5));
                }
                this.game.removeGameObjects();
                this.reset(); // удаляем врага

                // увеличиваем количество очков главного игрока
                if (!this.game.gameOver) this.game.score += this.score;
                if (this.game.isWin()) this.game.gameOver = true; // проверяем условие победы
            }
                }
            });
    
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
        }
    }

    reset() {
        this.free = true;
        this.markedForDeletion = false;
    }

    start() {
        this.free = false;
        this.direct();
        this.collisionY = (Math.random() * (this.game.topMargin - this.game.height * 0.82) +
                            this.game.height * 0.82);
        this.speedX = Math.random() * -1.5 - 2.5;
        this.lives = this.maxLives;
    }
}