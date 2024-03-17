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

export class LinerMove extends State {
    start() {
        this.unit.speedY = 0;
        this.unit.speedX = Math.random() * -1 - 0.5;
    }

    update() {
        if (this.unit.directX === 'right') {
            // Обновляем x-координату врага (уменьшаем ее на величину speedX)
            this.unit.collisionX += this.unit.speedX;
            // Помечаем врага как удаленного, если он полностью пересечет левую границу игрового поля
            if (this.unit.collisionX + this.unit.width < 0) {
                if (this.unit === this.game.player2.enemy) {
                    this.game.player2.setState(0);
                }
                this.unit.reset();
            }

        } else {
            this.unit.collisionX -= this.unit.speedX;
            if (this.unit.collisionX - this.unit.width > this.game.width) {
                if (this.unit === this.game.player2.enemy) {
                    this.game.player2.setState(0);
                }
                this.unit.reset();
            }
        }
    }
}