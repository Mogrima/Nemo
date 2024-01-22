import { Tree } from './Tree.js';
import { Bush } from './Bush.js';

export class Forest {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        this.maxTrees = 30;
        this.trees = [];
        this.maxBushes = 30;
        this.bushes = [];

    }
    init() {
        for (let i = 0; i < this.maxTrees; i++) {
            this.trees.push(new Tree(this.canvasWidth, this.canvasHeight));
        }
        for (let i = 0; i < this.maxBushes; i++) {
            this.bushes.push(new Bush(this.canvasWidth, this.canvasHeight));
        }
        this.objects = [...this.trees, ...this.bushes];
    }

    draw(context) {
    }
}