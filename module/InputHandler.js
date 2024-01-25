export class InputHandler {
    constructor(game) {
        this.game = game;
        this.debagKeys = ['d', 'D', 'в', 'В'];
        this.splashKeys = ['c', 'C', 'с', 'С'];
        this.closeMessageKeys = ['x', 'X', 'ч', 'Ч'];
        this.restartKeys = ['r', 'R', 'к', 'К'];
        window.addEventListener('keydown', e => {
            if (((e.key === 'ArrowRight') ||
                (e.key === 'ArrowUp') ||
                (e.key === 'ArrowDown') ||
                (e.key === 'x') ||
                (e.key === 'ArrowLeft')) &&
                this.game.keys.indexOf(e.key) === -1) {
                this.game.keys.push(e.key);
            } else if (e.key === ' ') {

                if ((this.game.direction.lastIndexOf('ArrowLeft') === this.game.direction.length - 1)
                && (this.game.direction.length > 0)) {
                    this.game.player.shootTop('left');

                } else {
                    this.game.player.shootTop('right');
                }

            }
            else if (this.splashKeys.includes(e.key)) {

                if ((this.game.direction.lastIndexOf('ArrowLeft') === this.game.direction.length - 1)
                && (this.game.direction.length > 0)) {
                    this.game.player.shootSplash('left');

                } else {
                    this.game.player.shootSplash('right');
                }

            } else if (this.debagKeys.includes(e.key)) {
                this.game.debug = !this.game.debug;
            } else if (this.restartKeys.includes(e.key)) {
                this.game.restart();
            }


        });
        window.addEventListener('keyup', e => {
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
        this.game.player.maxFrame = 0;
        if (this.game.keys.indexOf('ArrowLeft') > -1) {
            this.game.player.frameY = 7;
            this.game.player.maxFrame = 8;
            this.game.player2.frameY = 1;
            this.game.direction.length = 0;
            this.game.direction.push('ArrowLeft');
        } else if (this.game.keys.indexOf('ArrowRight') > -1) {
            this.game.player.frameY = 1;
            this.game.player.maxFrame = 8;
            this.game.player2.frameY = 3;
            this.game.direction.length = 0;
            this.game.direction.push('ArrowRight');
        } else if (this.game.keys.indexOf('ArrowUp') > -1) {
            this.game.player.frameY = 4;
            this.game.player.maxFrame = 8;
            this.game.player2.frameY = 1;

        } else if (this.game.keys.indexOf('ArrowDown') > -1) {
            this.game.player.frameY = 0;
            this.game.player.maxFrame = 8;
            this.game.player2.frameY = 3;
        }
    }
}