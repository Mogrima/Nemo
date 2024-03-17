class State {
    constructor(game, unit) {
        this.game = game;
        this.unit = unit;
    }
}

export class Hunting extends State {
    start() {
    }

    update() {
        this.unit.collisionX +=this.unit.speedX;
        this.unit.collisionY += this.unit.speedY;

        const aim = this.game.calcAim(this.unit, this.game.player);
        this.unit.speedX = aim[0];
        this.unit.speedY = aim[1];

        if (this.game.player.collisionX - this.unit.collisionX < 1) {
            this.unit.frameY = 4;
        } else {
            this.unit.frameY = 1;
        }
    }

}