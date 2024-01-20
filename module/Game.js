import { CanvasBackground } from './Background/CanvasBackground.js';
import { InputHandler } from './InputHandler.js';
import { Background } from '../UI/Background.js';
import { UI } from '../UI/UI.js';
import { Nemo } from './Units/Nemo.js';
import { Nebessime } from './Units/Nebessime.js';
import { Monster1 } from './Enemies/monster1.js';
import { Monster2 } from './Enemies/monster2.js';
import { Props } from './Props.js';
import { Particle } from './Particle.js';
import { FPS } from './FPS.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.width = canvas.width;
        this.height = canvas.height;
        this.fps = new FPS(this);
        this.fpsCount = 0;
        this.canvasBackground = new CanvasBackground(this.canvas);
        this.canvasObjects = [];
        this.player = new Nemo(this);
        this.player2 = new Nebessime(this);

        this.keys = [];
        this.input = new InputHandler(this);
        this.topMargin = 232;

        this.projectile = 20;

        this.projectileInterval = 500;
        this.maxProjectile = 20;
        this.projectileTimer = 0;

        this.ui = new UI(this);

        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 5000;
        this.gameOver = false;
        this.score = 0;
        this.winningScore = 30;
        this.win = false;

        this.gameTime = 90000;

        this.direction = [];

        this.health = 20;
        this.maxHealth = 20;

        this.speed = 1;
        this.background = new Background(this);

        this.particles = [];

        this.handlerJump = false;


        this.explosions = [];

        this.numberOfProps = 10;
        this.props = [];

        this.debug = true;

        this.intervalFpsDisplay = 3000;
        this.timerFpsDisplay = 0;

        this.gameObjects = [];

    }

    update(deltaTime, context) {
        this.trackGameOver(deltaTime); 
        this.canvasObjects = [...this.canvasBackground.forest.objects];
        this.gameObjects = [this.player, this.player2,  
                            ...this.props, ...this.canvasObjects,
                            ...this.enemies, ...this.particles];

        if (this.fpsCount === 0 && deltaTime !== 0) {
            this.fpsCount = this.fps.render(deltaTime);
        }
        if (this.timerFpsDisplay > this.intervalFpsDisplay) {
            this.fpsCount = this.fps.render(deltaTime);
            this.timerFpsDisplay = 0;
        } else {
            this.timerFpsDisplay += deltaTime;
        }

        this.player.update();
        this.player2.update();
        this.background.update();
        
        this.props.forEach((prop) => {
            prop.update(deltaTime, context);

        });

        this.props = this.props.filter(prop => !prop.markedForDeletion);
        this.input.update();

        if (this.projectileTimer > this.projectileInterval) {
            if (this.projectile < this.maxProjectile) this.projectile++;
            this.projectileTimer = 0;
        } else {
            this.projectileTimer += deltaTime;
        }

        this.particles.forEach(particle => particle.update());
        this.particles = this.particles.filter(particle => !particle.markedForDeletion);

        this.explosions.forEach(explosion => explosion.update(deltaTime));
        this.explosions = this.explosions.filter(explosion => !explosion.markedForDeletion);


        this.enemies.forEach(enemy => {
            enemy.update();
            // Проверим, не столкнолся ли враг с главным игроком (player)
            if (this.checkCollision(this.player, enemy)) {
                // если столкновение произошло, помечаем врага как удаленного
                enemy.markedForDeletion = true;
                for (let i = 0; i < enemy.score; i++) {
                    this.particles.push(new Particle(this, enemy.collisionX + enemy.width * 0.5,
                        enemy.collisionY + enemy.height * 0.5));
                }
                this.health--;
            }
            // для всех активных пуль (ammo) также проверим условие столкновения
            // пули с врагом.
            this.player.ammunition.forEach(ammo => {
                if (this.checkCollision(ammo, enemy)) {
                    enemy.lives--; // уменьшаем жизни врага на единицу
                    // если столкновение произошло, помечаем снаряд как удаленный
                    this.particles.push(new Particle(this, enemy.collisionX + enemy.width * 0.5,
                        enemy.collisionY + enemy.height * 0.5));
                        ammo.markedForDeletion = true;
                    if (enemy.lives <= 0) {
                        enemy.markedForDeletion = true; // удаляем врага
                        for (let i = 0; i < enemy.score; i++) {
                            this.particles.push(new Particle(this, enemy.collisionX + enemy.width * 0.5,
                                enemy.collisionY + enemy.height * 0.5));
                        }
                        // увеличиваем количество очков главного игрока
                        if (!this.gameOver) this.score += enemy.score;
                        if (this.isWin()) this.gameOver = true; // проверяем условие победы
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

    init() {
        this.canvasBackground.init();
        this.addProps();
    }

    addEnemy() {
        const randomize = Math.random();
        if (randomize < 0.5) this.enemies.push(new Monster1(this));
        else this.enemies.push(new Monster2(this));
    }

    addProps() {
        let attempts = 0;
        while (this.props.length < this.
            numberOfProps && attempts < 100) {
            const testProp = new Props(this);
            let overlap = false;

            this.props.forEach(prop => {
                const distanceBuffer = 80;
                if (testProp.collisionX < prop.collisionX + prop.width + distanceBuffer &&
                        prop.collisionX < testProp.collisionX + testProp.width + distanceBuffer) {
                    overlap = true;
                }
            });

            if (!overlap && testProp.spriteX > 0 &&
                    testProp.spriteX < this.width - testProp.width) {
                if (!this.checkCollision(this.player, testProp)) {
                    this.props.push(testProp);
                }
                
            }
            attempts++;
        }
        this.props.forEach((item, index) => {
            if (index < 3) {
                item.feature = item.strangeMessage;
                item.featureName = 'strangeMessage';
            } 
            else if (index < 5) {
                item.feature = item.lossOfHealth;
                item.featureName = 'Lose health';
            } else if (index < 8) {
                item.feature = item.upHealth;
                item.featureName = 'Up health';
            }
            else if (index < 9) {
                item.feature = item.reboot;
                item.featureName = 'Reboot!';
            } 
            else if (index === 9)  {
                item.feature = item.escape;
                item.featureName = 'The escape!';
            }
        });

    }

    checkCollision(rect1, rect2) {
        return (
            rect1.collisionX < rect2.collisionX + rect2.width &&
            rect2.collisionX < rect1.collisionX + rect1.width &&
            rect1.collisionY < rect2.collisionY + rect2.height &&
            rect2.collisionY < rect1.collisionY + rect1.height);
    }

    isWin() {
        return ((this.win || (this.score >= this.winningScore))
                && this.health > 0)
    }

    trackGameOver(deltaTime) {
        if (!this.gameOver) this.gameTime -= deltaTime;
        if (this.gameTime < 0) {
            this.gameOver = true;
            this.gameTime = 0;
        }

        if (this.health <= 10 ) this.player.warning = true;
        else this.player.warning = false;
        if (this.health <= 0) {
            this.gameOver = true;
        }
    }

    draw(context) {
        // this.background.draw(context);
        
        this.canvasBackground.draw(context);
        this.gameObjects.sort((a, b) =>{
            return (a.collisionY + a.height) - (b.collisionY + b.height);
            
        });
        this.gameObjects.forEach(object => {
            object.draw(context);
        });
        this.ui.draw(context);
        this.explosions.forEach(explosion => explosion.draw(context));
    }
}