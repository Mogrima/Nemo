import { Tree } from './Tree.js';
import { Bush } from './Bush.js';

export class Forest {
    constructor(x, y, canvas) {
        this.canvas = canvas;
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height * 0.3;
        this.x = x;
        this.y = y;
        this.marginTop = 100;
        this.color = "#228b22";
        this.maxTrees = 30;
        this.trees = [];
        this.maxBushes = 30;
        this.bushes = [];
        // this.tree = new Tree(canvas);

    }
    init() {
        for (let i = 0; i < this.maxTrees; i++) {
            this.trees.push(new Tree(this.canvasWidth, this.canvasHeight));
        }
        for (let i = 0; i < this.maxBushes; i++) {
            this.bushes.push(new Bush(this.canvasWidth, this.canvasHeight));
        }
        console.log(this.bushes)
    }

    draw(context) {
        context.save();
        // context.fillStyle = this.color;
        // context.fillRect(this.x, this.y, this.canvasWidth, this.canvasHeight);
        context.restore();
       
        this.trees.sort((a, b) =>{
            return (a.y + a.image.height) - (b.y + b.image.height);
        });
        this.trees.forEach(tree => {
            tree.draw(context);
        });
        this.bushes.sort((a, b) =>{
            return (a.y + a.height) - (b.y + b.height);
        });
        this.bushes.forEach(bush => {
            bush.draw(context);
        });
    }
}