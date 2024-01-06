import { Tree } from './Tree.js';

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
        // this.tree = new Tree(canvas);

    }
    init() {
        for (let i = 0; i < this.maxTrees; i++) {
            this.trees.push(new Tree(canvas));
        }
    }

    draw(context) {
        context.save();
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.canvasWidth, this.canvasHeight);
        context.restore();
        this.trees.sort((a, b) =>{
            return a.y - b.y;
        });
        this.trees.forEach(tree => {
            tree.draw(context);
        });
    }
}