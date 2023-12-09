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
                context.fillStyle = this.colorWin;
                message1 = 'Liberty!';
                message2 = 'You have overcome the Darkness!';
            } else {
                context.fillStyle = this.colorLose;
                message1 = 'This is the end!';
                message2 = 'Mental breakdown!';
            }
            context.font = '70px ' + this.fontFamily;
            context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 20);
            context.font = '25px ' + this.fontFamily;
            context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 20);
            context.restore();
        }

        for (let i = 0; i < this.game.ammo; i++) {
            context.fillRect(5 * i + 20, 50, 3, 20);
        }
        // жизни
        context.fillText('Psyche: ', 20, 100);
        if(this.game.player.warning) {
            context.fillStyle = this.colorLose;
        }
        for (let i = 0; i < this.game.health; i++) {
            context.fillRect(5 * i + 20, 110, 3, 20);
        }
        context.restore();
    }
}