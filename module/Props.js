export class Props {
    constructor(game) {
        this.game = game;
        this.uncannyText = ['You have been chosen. They will come soon.',
                'The end is near. Make preparations.',
                'The drop off has been made. You`ve been warned.',
                'The flashing light was just a test. You`ll have plenty of warning next time.',
                'They`re coming soon. Maybe you should think twice about opening the fear.'];
    }

    strangeMessage(context) {
        context.fillStyle = 'black';
        context.fillRect(this.game.width * 0.5, this.game.height * 0.5, 200, 200);
        context.fillStyle = 'white';
        context.fillText(this.text, this.game.width * 0.5, this.game.height * 0.5);
       
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
        this.game.props = [];
        this.game.addProps();
    }

    getFeature() {
        const randomize = Math.random();
        if (randomize < 0.3) {
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
}