export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 25;
        this.fontFamily = 'Silkscreen';
        this.color = '#0000ff';
        this.colorWin = '#008000';
        this.colorLose = '#ffff00';
    }

    draw(context) {
        context.save();
        context.fillStyle = 'rgba(0, 128, 0, 0.5)';
        context.fillRect(10, 5, 200, 220);
        context.fillStyle = this.color;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black';
        context.font = this.fontSize + 'px ' + this.fontFamily;
        // очки
        context.fillText('Score: ' + this.game.score, 20, 40);
        // таймер
        const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
        context.fillText('Timer: ' + formattedTime, 20, 160);
        // сообщения о победе или проигрыше
        if (this.game.gameOver) {
            context.save();
            context.textAlign = 'center';
            let message1;
            let message2;
            if (this.game.isWin()) {
                context.fillStyle = '#ed05da';
                message1 = 'Liberty!';
                message2 = 'You have overcome the Darkness!';
                this.game.sound.escape.play();

            } else {
                context.fillStyle = this.colorLose;
                message1 = 'This is the end!';
                message2 = 'Mental breakdown!';
                this.game.sound.youLoseSound.play();
            }
            context.shadowBlur = 5;
            context.font = '70px ' + this.fontFamily;
            context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 20);
            context.font = '25px ' + this.fontFamily;
            context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 20);
            context.font = '15px ' + this.fontFamily;
            context.fillText('Press key \'R\' to restart the Game', this.game.width * 0.5, this.game.height * 0.5 + 60);
            context.restore();
        }

        for (let i = 0; i < this.game.projectile; i++) {
            context.fillRect(5 * i + 20, 50, 3, 20);
        }
        // жизни
        context.fillText('Psyche: ', 20, 100);
        if (this.game.player.warning) {
            context.fillStyle = this.colorLose;
        }
        for (let i = 0; i < this.game.health; i++) {
            context.fillRect(5 * i + 20, 110, 3, 20);
        }
        // FPS
        context.fillStyle = this.colorLose;
        context.fillText('FPS: ' + this.game.fpsCount, 20, 200);
        context.restore();
    }
}