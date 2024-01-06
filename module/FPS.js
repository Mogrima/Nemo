export class FPS {
    constructor(game) {
        this.game = game;
    }

    render(deltatime) {
        return Math.floor(1000 / deltatime);

    }
}