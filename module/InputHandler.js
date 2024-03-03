export class InputHandler {
    constructor(game) {
        this.game = game;
        this.debagKeys = ['='];
        this.splashKeys = ['c', 'C', 'с', 'С'];
        this.closeMessageKeys = ['x', 'X', 'ч', 'Ч', 'Escape'];
        this.restartKeys = ['r', 'R', 'к', 'К'];
        window.addEventListener('keydown', e => {
            
            switch(e.key) {
                case 'ArrowRight':
                    this.game.keys.add('ArrowRight'); break;
                case 'ArrowUp':
                    this.game.keys.add('ArrowUp'); break;
                case 'ArrowDown':
                    this.game.keys.add('ArrowDown'); break;
                case 'ArrowLeft':
                    this.game.keys.add('ArrowLeft'); break;
                //
                case 'd':
                    this.game.keys.add('ArrowRight'); break;
                case 'w':
                    this.game.keys.add('ArrowUp'); break;
                case 's':
                    this.game.keys.add('ArrowDown'); break;
                case 'a':
                    this.game.keys.add('ArrowLeft'); break;
                }

            if (((e.key === 'ArrowRight') ||
                (e.key === 'ArrowUp') ||
                (e.key === 'ArrowDown') ||
                (e.key === 'ArrowLeft'))) {
            } else if (e.key === ' ') {

                if ((this.game.direction.has('ArrowLeft'))) {
                    this.game.player.shootTop('left');

                } else {
                    this.game.player.shootTop('right');
                }

            } else if (this.splashKeys.includes(e.key)) {

                if ((this.game.direction.has('ArrowLeft'))) {
                    this.game.player.shootSplash('left');

                } else {
                    this.game.player.shootSplash('right');
                }

            } else if (this.debagKeys.includes(e.key)) {
                this.game.debug = !this.game.debug;
            } else if (this.restartKeys.includes(e.key)) {
                this.game.restart();
            } else if (this.closeMessageKeys.includes(e.key)) {
                this.game.toggleMessage = true;
            }


        });
        window.addEventListener('keyup', e => {
            this.game.toggleMessage = false;

            switch(e.key) {
                case 'ArrowRight':
                    this.game.keys.delete('ArrowRight'); break;
                case 'ArrowUp':
                    this.game.keys.delete('ArrowUp'); break;
                case 'ArrowDown':
                    this.game.keys.delete('ArrowDown'); break;
                case 'ArrowLeft':
                    this.game.keys.delete('ArrowLeft'); break;

                case 'd':
                    this.game.keys.delete('ArrowRight'); break;
                case 'w':
                    this.game.keys.delete('ArrowUp'); break;
                case 's':
                    this.game.keys.delete('ArrowDown'); break;
                case 'a':
                    this.game.keys.delete('ArrowLeft'); break;
                }
        });

    }
    // постоянное отслеживание нажатой клавиши, чтобы персонаж двигался и смотрел в нужную сторону
    update() {
        this.game.player.maxFrame = 0;
        if (this.game.keys.has('ArrowLeft')) {
            this.game.player.frameY = 7;
            this.game.player.maxFrame = 8;
            this.game.direction.clear();
            this.game.direction.add('ArrowLeft');
        } else if (this.game.keys.has('ArrowRight')) {
            this.game.player.frameY = 1;
            this.game.player.maxFrame = 8;
            this.game.direction.clear();
            this.game.direction.add('ArrowRight');
        } else if (this.game.keys.has('ArrowUp')) {
            this.game.player.frameY = 4;
            this.game.player.maxFrame = 8;

        } else if (this.game.keys.has('ArrowDown')) {
            this.game.player.frameY = 0;
            this.game.player.maxFrame = 8;
        }
    }
}