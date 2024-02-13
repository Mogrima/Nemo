export class SoundController {
    constructor() {
        this.mainSound = document.getElementById('mainTheme');
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
    }

    youLose() {
    }

    tentacles() {
    }

    collision() {
        this.cooldownRun = true;
    }
}