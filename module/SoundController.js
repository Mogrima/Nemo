export class SoundController {
    constructor() {
        this.mainSound = document.getElementById('mainTheme');
        this.escape = document.getElementById('escape');
        this.youLoseSound = document.getElementById('youLose');
        this.hitSound = document.getElementById('hit');
        this.anotherHitSound = document.getElementById('anotherHit');
        this.tentaclesSound = document.getElementById('tentaclesSound');
        this.beastSound = document.getElementById('beast');
        this.beastSound2 = document.getElementById('beast2');
    }

    mainTheme() {
        this.mainSound.currentTime = 0;
        this.mainSound.loop = true;
        this.mainSound.volume = 1;
        this.mainSound.play();
    }

    youIsEscape() {
        this.escape.currentTime = 0;
        this.escape.volume = 0.1;
        this.escape.play();
    }

    hit() {
        this.hitSound.currentTime = 0;
        this.hitSound.volume = 0.4;
        this.hitSound.play();
    }

    anotherHit() {
        this.anotherHitSound.currentTime = 0;
        this.anotherHitSound.volume = 0.4;
        this.anotherHitSound.play();
    }

    youLose() {
        this.youLoseSound.currentTime = 0;
        this.youLoseSound.volume = 0.1;
        this.youLoseSound.play();
    }

    tentacles() {
        this.tentaclesSound.volume = 1;
        this.tentaclesSound.play();
    }

    deathEnemy() {
        this.beastSound.currentTime = 0;
        this.beastSound.volume = 0.8;
        this.beastSound.play();
    }

    deathEnemy2() {
        this.beastSound2.currentTime = 0;
        this.beastSound2.volume = 0.8;
        this.beastSound2.play();
    }

    collision() {
        this.cooldownRun = true;
    }
}