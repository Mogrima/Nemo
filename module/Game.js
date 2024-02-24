import { CanvasBackground } from './Background/CanvasBackground.js';
import { InputHandler } from './InputHandler.js';
import { UI } from '../UI/UI.js';
import { Nemo } from './Units/Nemo.js';
import { Nebessime } from './Units/Nebessime.js';
import { Monster1 } from './Enemies/monster1.js';
import { Monster2 } from './Enemies/monster2.js';
import { Props } from './Props/Props.js';
import { Ammunition } from './Projectles/Ammunition.js';
import { Splash } from './Projectles/Splash.js';
import { Tentacles } from './Props/Tentacles.js';
import { SoundController } from './SoundController.js';

export class Game {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;

        this.canvasBackground = new CanvasBackground(this.canvas, context);
        this.ui = new UI(this);
        this.player = new Nemo(this);
        this.player2 = new Nebessime(this);
        this.input = new InputHandler(this);
        this.prop = new Props(this);
        this.sound = new SoundController();

        this.topMargin = 232;
        this.speed = 1;
        this.winningScore = 30;
        this.maxHealth = 20;
        this.gameTime = 90000;
        this.numberOfProps = 10;
        this.maxProjectile = 20;
        this.maxEnemies = 10;
        this.projectileInterval = 500;
        this.enemyInterval = 5000;
        this.intervalFpsDisplay = 3000;

        this.canvasObjects = [];
        this.units = new Set();
        this.keys = new Set();
        this.direction = new Set();
        this.ammoPool = [];
        this.splashPool = [];
        this.enemies = new Set();
        this.enemiesPool = [];
        this.particles = new Set();
        this.corpuscles = new Set();
        this.props = new Set();
        this.gameObjects = [];

        this.gameOver;
        this.score;
        this.win;
        this.health;
        this.projectile;
        this.projectileTimer;
        this.enemyTimer;
        this.fpsCount = 0;
        this.timerFpsDisplay = 0;

        this.spriteUpdate = false;
        this.spriteTimer = 0;
        this.spriteInterval = 150;

        this.debug = false;
        this.toggleMessage = false;

    }

    update(deltaTime, context) {
        this.trackGameOver(deltaTime);
        this.handleSpriteTimer(deltaTime);
        this.input.update();
        this.canvasObjects = [...this.canvasBackground.forest.objects];
        this.gameObjects = [...this.units,
            ...this.props, ...this.canvasObjects,
            ...this.enemies, ...this.particles,
            ...this.corpuscles];

        this.gameObjects.forEach(object => {
            object.update(deltaTime, context);
        });

        this.fpsDraw(deltaTime);

        if (this.projectileTimer > this.projectileInterval) {
            if (this.projectile < this.maxProjectile) this.projectile++;
            this.projectileTimer = 0;
        } else {
            this.projectileTimer += deltaTime;
        }

        if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
            const enemy = this.getEnemy();
            if (enemy) {
                this.enemies.add(enemy);
                enemy.start();
            }
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }
    }

    init() {
        this.gameOver = false;
        this.score = 0;
        this.win = false;
        this.health = 20;
        this.player2.restart();
        this.units.add(this.player).add(this.player2);
        this.projectile = 20;
        this.projectileTimer = 0;
        this.enemyTimer = 0;
        this.canvasBackground.init();
        this.addProps();
        this.addEnemy();
        this.createAmmoProjectiles();
        this.createSplashProjectiles();
        this.sound.mainTheme();
    }

    addEnemy() {
        for (let i = 0; i < this.maxEnemies; i++) {
            const randomize = Math.random();
            if (randomize < 0.5) {
                this.enemiesPool.push(new Monster1(this));
            } else {
                this.enemiesPool.push(new Monster2(this));
            }
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
        while (this.props.size < this.
            numberOfProps && attempts < 100) {
            const testProp = new Tentacles(this);
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
                    testProp.start();
                    this.props.add(testProp);
                }

            }
            attempts++;
        }
        this.checkTentaclesEscape();
    }

    checkCollision(rect1, rect2) {
        return (
            rect1.collisionX < rect2.collisionX + rect2.width &&
            rect2.collisionX < rect1.collisionX + rect1.width &&
            rect1.collisionY < rect2.collisionY + rect2.height &&
            rect2.collisionY < rect1.collisionY + rect1.height);
    }

    checkTentaclesEscape() {
        console.clear();
        this.props.forEach(prop => {
            if (prop.featureName == 'escape') {
                console.log(true);
                return;
            }
        })
    }

    isWin() {
        return ((this.win || (this.score >= this.winningScore))
                && this.health > 0);
    }

    trackGameOver(deltaTime) {
        if (!this.gameOver) this.gameTime -= deltaTime;
        if (this.gameTime < 0) {
            this.gameOver = true;
            this.gameTime = 0;
        }

        if (this.health <= 10) this.player.warning = true;
        else this.player.warning = false;
        if (this.health <= 0) {
            this.gameOver = true;
        }
    }

    fpsDraw(deltaTime) {
        if (this.fpsCount === 0 && deltaTime !== 0) {
            this.fpsCount = Math.floor(1000 / deltaTime);
        }
        if (this.timerFpsDisplay > this.intervalFpsDisplay) {
            this.fpsCount = Math.floor(1000 / deltaTime);
            this.timerFpsDisplay = 0;
        } else {
            this.timerFpsDisplay += deltaTime;
        }
    }

    handleSpriteTimer(deltaTime) {
        if (this.spriteTimer < this.spriteInterval) {
            this.spriteTimer += deltaTime;
            this.spriteUpdate = false;
        } else {
            this.spriteUpdate = true;
            this.spriteTimer = 0;
        }
    }

    restart() {
        this.sound.escape.pause();
        this.sound.escape.currentTime = 0;
        this.sound.youLoseSound.pause();
        this.sound.youLoseSound.currentTime = 0;
        this.gameTime = 90000;
        this.ammoPool = [];
        this.splashPool = [];
        this.enemies.clear();
        this.enemiesPool = [];
        this.direction.clear();
        this.particles.clear();
        this.corpuscles.clear();
        this.props.clear();
        this.canvasBackground.forest.restart();
        this.canvasBackground.sky.restart();
        this.units.add(this.player);
        this.player.restart();
        this.player2.restart();
        this.prop.restart();
        this.init();
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