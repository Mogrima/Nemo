import { Tree } from './Tree.js';
import { Bush } from './Bush.js';
import { BushObstacle } from './BushObstacle.js';

export class Forest {
    constructor(game, topBoundary) {
        this.game = game;
        this.topBoundary = topBoundary;
        this.maxTrees = 60;
        this.trees = [];
        this.maxBushes = 60;
        this.bushes = [];
        this.bushesObstacle = [];

    }
    init() {
        for (let i = 0; i < this.maxTrees; i++) {
            this.trees.push(new Tree(this.game, this.topBoundary));
        }
        for (let i = 0; i < this.maxBushes; i++) {
            this.bushes.push(new Bush(this.game, this.topBoundary));
        }
        for (let i = 0; i < this.maxBushes; i++) {
            this.bushesObstacle.push(new BushObstacle(this.game, this.topBoundary));
        }
        this.objects = [...this.trees, ...this.bushes, ...this.bushesObstacle];
    }

    draw(context) {
    }

    restart() {
        this.trees = [];
        this.bushes = [];
        this.bushesObstacle = [];
    }
}