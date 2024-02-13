export class Props {
    constructor(game) {
        this.game = game;
        this.isEscape = false;
        this.uncannyText = ['You have been chosen.\nThey will come soon.',
                'The end is near.\nMake preparations.',
                'The drop off has been\nmade. You`ve been warned.',
                'The flashing light was\njust a test. You`ll have\nplenty of warning next time.',
                'They`re coming soon.\nMaybe you should think\ntwice about opening the fear.'];
    }

    strangeMessage(context) {
        const messageWidth = 400;
        const messageHeight = 300;
        const text = this.text.split('\n');
        context.save();
        context.fillStyle = '#00BC17';
        context.font = 20 + 'px ' + 'Silkscreen';
        context.shadowOffsetX = 2;
        context.shadowColor = 'black';
        context.textAlign = 'center';
        context.fillRect(this.game.width * 0.5 - messageWidth * 0.5,
            this.game.height * 0.5 - messageHeight * 0.5,
            messageWidth, messageHeight);
        context.fillStyle = 'black';
        context.shadowOffsetY = 2;
        context.shadowBlur = 0;
        context.shadowColor = 'red';
        for (let i = 0; i < text.length; i++) {
            context.fillText(text[i],  this.game.width * 0.5,
                this.game.height * 0.5 + i * 25);
        }
        context.font = 13 + 'px ' + 'Silkscreen';
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.fillText('Press key \'X\' or \'Esc\' to close the message',  this.game.width * 0.5,
            this.game.height * 0.5 + messageHeight * 0.5 - 20);
        context.restore();
       
    }

    lossOfHealth() {
        this.game.health = Math.trunc(this.game.health / 2);
        console.log('Lose health');
        if (this.game.health <= 0) {
            this.game.gameOver = true;
        }
    }

    upHealth() {
        this.game.health = this.game.maxHealth;
        console.log('Up health');
    }

    escape() {
        console.log('The escape!');
        this.game.win = true;
        this.game.gameOver = true;
    }

    reboot() {
        this.game.prop.isEscape = false;
        this.game.props.clear();
        this.game.addProps();
    }

    getFeature() {
        const randomize = Math.random();
        if (!this.isEscape) {
            this.isEscape = true;
            return ([
                this.escape,
                'escape',
               ]);
        } else if (randomize < 0.3) {
           return ([
            this.strangeMessage,
            'strangeMessage',
            this.uncannyText[Math.floor(Math.random() * 5)]
           ]);
        } else if (randomize < 0.5) {
            return ([
             this.lossOfHealth,
             'Lose health'
            ]);
         } else if (randomize < 0.8) {
            return ([
             this.upHealth,
             'Up health'
            ]);
         } else if (randomize < 1) {
            return ([
             this.reboot,
             'Reboot!'
            ]);
         } 
        
    }

    restart() {
        this.isEscape = false;
    }
}