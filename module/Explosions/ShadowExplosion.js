import { Explosion } from './Explosions.js';

export class ShadowExplosion extends Explosion {
    constructor(game, x, y) {
        super(game, x, y);
        this.image = document.getElementById('explosion1');
    }
}