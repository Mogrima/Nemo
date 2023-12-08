import { Layer} from './Layer.js';

export class Background {
    constructor(game) {
        this.game = game;
        this.image1 = document.getElementById('layer1');

        this.image2 = document.getElementById('layer2');
        this.image3 = document.getElementById('layer3');
        this.image4 = document.getElementById('layer4');
        this.image5 = document.getElementById('layer5');
        this.image6 = document.getElementById('layer6');
        this.image7 = document.getElementById('layer7');
        this.image8 = document.getElementById('layer8');
        this.image9 = document.getElementById('layer9');
        this.image10 = document.getElementById('layer10');
        this.image11 = document.getElementById('layer11');
        this.image12 = document.getElementById('layer12');
        this.image13 = document.getElementById('layer13');

        this.layer1 = new Layer(this.game, this.image1, 4);

        this.layer2 = new Layer(this.game, this.image2, 3);
        this.layer3 = new Layer(this.game, this.image3, 3);
        this.layer4 = new Layer(this.game, this.image4, 2);
        this.layer5 = new Layer(this.game, this.image5, 2);
        this.layer6 = new Layer(this.game, this.image6, 2);
        this.layer7 = new Layer(this.game, this.image7, 2);
        this.layer8 = new Layer(this.game, this.image8, 2);
        this.layer9 = new Layer(this.game, this.image9, 1);
        this.layer10 = new Layer(this.game, this.image10, 1);
        this.layer11 = new Layer(this.game, this.image11, 1);
        this.layer12 = new Layer(this.game, this.image12, 1);
        this.layer13 = new Layer(this.game, this.image13, 1);

        this.layers = [this.layer13, this.layer12, this.layer11, this.layer10, this.layer9, this.layer8, this.layer7, this.layer6,  this.layer5, this.layer4, this.layer3,  this.layer2, ];

    }
    update() {
        this.layers.forEach(layer => layer.update());
    }

    draw(context) {
        this.layers.forEach(layer => layer.draw(context));
    }
}