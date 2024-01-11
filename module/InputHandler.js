export class InputHandler {
    constructor(game) {
        this.game = game;
        window.addEventListener('keydown', e => {
            console.log(e.key)
            if (((e.key === 'ArrowRight') ||
                (e.key === 'ArrowLeft')) &&
                this.game.keys.indexOf(e.key) === -1) {
                this.game.keys.push(e.key);
            } else if (e.key === 'Shift') {
                this.game.handlerJump = true;
            } else if (e.key === ' ') {

                if ((this.game.direction.lastIndexOf('ArrowLeft') === this.game.direction.length - 1)
                && (this.game.direction.length > 0)) {
                    this.game.player.shootTop(this.game.player.collisionX,
                        this.game.player.collisionY + 30, 'left');

                } else {
                    this.game.player.shootTop(this.game.player.collisionX + this.game.player.width,
                        this.game.player.collisionY + 30, 'right');
                }

            } else if (e.key === 'd') {
                this.game.debug = !this.game.debug;
            }


        });
        window.addEventListener('keyup', e => {
            if (this.game.handlerJump) {
                this.game.handlerJump = false;
            }
            if (this.game.keys.indexOf(e.key) > -1) {
                this.game.keys.splice(this.game.keys.indexOf(e.key), 1);

                if ((this.game.direction.lastIndexOf('ArrowLeft') === this.game.direction.length - 1)
                && (this.game.direction.length > 0)) {
                    this.game.player2.frameY = 0;

                } else {
                    this.game.player2.frameY = 2;
                }
            }
        });

    }
    // постоянное отслеживание нажатой клавиши, чтобы персонаж двигался и смотрел в нужную сторону
    update() {
        if ((this.game.keys.lastIndexOf('ArrowLeft') === this.game.keys.length - 1)
        && (this.game.keys.length > 0)) {
            this.game.player.maxFrame = 8;
            this.game.player.frameY = 7;
            this.game.player2.frameY = 1;
            this.game.direction.length = 0;
            this.game.direction.push('ArrowLeft');

        } else if (this.game.keys.length === 0) {
            this.game.player.maxFrame = 0;
        } else {
            this.game.player.maxFrame = 8;
            this.game.player.frameY = 1;
            this.game.player2.frameY = 3;
            this.game.direction.length = 0;
            this.game.direction.push('ArrowRight');
        }
    }
}