import { Explosion } from './Explosions.js';

export class GorgonExplosion extends Explosion {
    constructor(game, x, y) {
        super(game, x, y);
        this.image = document.getElementById('explosion2');
    }
}