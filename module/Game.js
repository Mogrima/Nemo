import {InputHandler} from './InputHandler.js';
import {Background} from '../UI/Background.js';
import {UI} from '../UI/UI.js';
import {Nemo} from './Units/Nemo.js';
import {Nebessime} from './Units/Nebessime.js';
import {Monster1} from './Enemies/monster1.js';
import {Monster2} from './Enemies/monster2.js';

export class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.player = new Nemo(this);
        this.player2 = new Nebessime(this);

        this.keys = [];
        this.input = new InputHandler(this);

        this.ammo = 20;

        this.ammoInterval = 500;
        this.maxAmmo = 20;
        this.ammoTimer = 0;

        this.ui = new UI(this);

        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 5000;
        this.gameOver = true;
        this.score = 0;
        this.winningScore = 30;

        this.gameTime = 0;
        this.timeLimit = 1000 * 1000;

        this.direction = [];

        this.health = 20;

        this.speed = 1;
        this.background = new Background(this);

        this.debug = true;
        
    }

    update(deltaTime) {
        if (!this.gameOver) this.gameTime += deltaTime;
        if (this.gameTime > this.timeLimit) this.gameOver = true;

        this.player.update();
        this.player2.update();
        this.background.update();
        this.input.update();

        if (this.ammoTimer > this.ammoInterval) {
            if (this.ammo < this.maxAmmo) this.ammo++;
            this.ammoTimer = 0;
        } else {
            this.ammoTimer += deltaTime;
        }

        this.enemies.forEach(enemy => {
            enemy.update();
            // Проверим, не столкнолся ли враг с главным игроком (player)
            if (this.checkCollision(this.player, enemy)) {
                // если столкновение произошло, помечаем врага как удаленного
                enemy.markedForDeletion = true;
                this.health--;
                if(this.health <= 0) {
                    this.gameOver = true;
                }
                if(this.health < 10) this.player.warning = true;
            }
            // для всех активных пуль (projectiles) также проверим условие столкновения
            // пули с врагом. 
            this.player.projectiles.forEach(projectile => {
                if (this.checkCollision(projectile, enemy)) {
                    enemy.lives--; // уменьшаем жизни врага на единицу
                    // если столкновение произошло, помечаем снаряд как удаленный
                    projectile.markedForDeletion = true;
                    if (enemy.lives <= 0) {        
                        enemy.markedForDeletion = true; // удаляем врага        
                        if (!this.gameOver) this.score += enemy.score; // увеличиваем количество очков главного игрока       
                        if (this.isWin()) this.gameOver = true;  // проверяем условие победы
                    }
                }
            });
        });

        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);

        if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
            this.addEnemy();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }
    }

    addEnemy() {
        const randomize = Math.random();
        if (randomize < 0.5) this.enemies.push(new Monster1(this))
        else this.enemies.push(new Monster2(this));
    }

    checkCollision(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect2.x < rect1.x + rect1.width &&
            rect1.y < rect2.y + rect2.height &&
            rect2.y < rect1.y + rect1.height)
    }

    isWin() {
        return this.score >= this.winningScore;
    }

    draw(context) {   
        this.background.draw(context);
        this.ui.draw(context);
        // context.fillStyle = "#fde910";
        context.fillStyle = "rgba(255,0,0,0)";
        this.player.draw(context);
        context.fillStyle = "#18171c";
        this.player2.draw(context);
        this.enemies.forEach(enemy => enemy.draw(context));
    }
}