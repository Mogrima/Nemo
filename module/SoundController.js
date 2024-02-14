export class SoundController {
    constructor() {
        this.mainSound = document.getElementById('mainTheme');
        this.hitSound = document.getElementById('hit');
        this.anotherHitSound = document.getElementById('anotherHit');
    }

    mainTheme() {
        this.mainSound.currentTime = 0;
        this.mainSound.loop = true;
        this.mainSound.volume = 1;
        this.mainSound.play();
    }

    youIsEscape() {
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
    }

    tentacles() {
    }

    collision() {
        this.cooldownRun = true;
    }
}