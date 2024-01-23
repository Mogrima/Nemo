import { CanvasBackground } from './Background/CanvasBackground.js';
import { InputHandler } from './InputHandler.js';
import { UI } from '../UI/UI.js';
import { Nemo } from './Units/Nemo.js';
import { Nebessime } from './Units/Nebessime.js';
import { Monster1 } from './Enemies/monster1.js';
import { Monster2 } from './Enemies/monster2.js';
import { Props } from './Props.js';
import { Ammunition } from './Projectles/Ammunition.js';
import { Splash } from './Projectles/Splash.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas
        this.width = canvas.width;
        this.height = canvas.height;
        this.fpsCount = 0;
        this.canvasBackground = new CanvasBackground(this.canvas);
        this.canvasObjects = [];
        this.player = new Nemo(this);
        this.player2 = new Nebessime(this);

        this.keys = [];
        this.input = new InputHandler(this);
        this.topMargin = 232;

        this.projectile = 20;
        this.ammoPool = [];
        this.splashPool = [];

        this.projectileInterval = 500;
        this.maxProjectile = 20;
        this.projectileTimer = 0;

        this.ui = new UI(this);

        this.enemies = [];
        this.maxEnemies = 10;
        this.enemiesPool = [];
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

        this.particles = [];

        this.numberOfProps = 10;
        this.props = [];

        this.debug = true;

        this.intervalFpsDisplay = 3000;
        this.timerFpsDisplay = 0;

        this.gameObjects = [];

    }

    update(deltaTime, context) {
        this.trackGameOver(deltaTime);
        this.input.update();
        this.canvasObjects = [...this.canvasBackground.forest.objects];
        this.gameObjects = [this.player, this.player2,  
                            ...this.props, ...this.canvasObjects,
                            ...this.enemies, ...this.particles];

        this.gameObjects.forEach(object => {
            object.update(deltaTime, context);
        });

        if (this.fpsCount === 0 && deltaTime !== 0) {
            this.fpsCount = Math.floor(1000 / deltaTime);
        }
        if (this.timerFpsDisplay > this.intervalFpsDisplay) {
            this.fpsCount = Math.floor(1000 / deltaTime);
            this.timerFpsDisplay = 0;
        } else {
            this.timerFpsDisplay += deltaTime;
        }

        if (this.projectileTimer > this.projectileInterval) {
            if (this.projectile < this.maxProjectile) this.projectile++;
            this.projectileTimer = 0;
        } else {
            this.projectileTimer += deltaTime;
        }

        if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
            let enemy = this.getEnemy();
            if (enemy) {
            this.enemies.push(enemy);
            enemy.start();
            }
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }  
    }

    init() {
        this.canvasBackground.init();
        this.addProps();
        this.addEnemy();
        this.createAmmoProjectiles();
        this.createSplashProjectiles();
    }

    addEnemy() {
        for (let i = 0; i < this.maxEnemies; i++) {
            const randomize = Math.random();
            if (randomize < 0.5) this.enemiesPool.push(new Monster1(this));
            else this.enemiesPool.push(new Monster2(this));
        }
    }

    getEnemy() {
        for (let i = 0; i < this.enemiesPool.length; i++) {

            if (this.enemiesPool[i].free) {
                return this.enemiesPool[i];
            }
        }
    }

    createAmmoProjectiles() {
        for (let i = 0; i < this.projectile; i++) {
            this.ammoPool.push(new Ammunition(this, 1400));
        }
    }

    getAmmoProjectile() {
        for (let i = 0; i < this.ammoPool.length; i++) {
            if (this.ammoPool[i].free) return this.ammoPool[i];
        }
    }

    createSplashProjectiles() {
        for (let i = 0; i < this.projectile; i++) {
            this.splashPool.push(new Splash(this, 200));
        }
    }

    getSplashProjectile() {
        for (let i = 0; i < this.splashPool.length; i++) {
            if (this.splashPool[i].free) return this.splashPool[i];
        }
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

    removeGameObjects() {
        this.props = this.props.filter(object => !object.markedForDeletion);
        this.enemies = this.enemies.filter(object => !object.markedForDeletion);
        this.particles = this.particles.filter(object => !object.markedForDeletion);
    }

    draw(context) {
        this.canvasBackground.draw(context);
        this.gameObjects.sort((a, b) =>{
            return (a.collisionY + a.height) - (b.collisionY + b.height);
            
        });
        this.gameObjects.forEach(object => {
            object.draw(context);
        });
        this.ui.draw(context);
    }
}