import { Projectile } from './Projectile.js';

export class Ammunition extends Projectile {
    constructor(game, r) {
        super(game, r);
        this.image = document.getElementById('projectile3');
        this.r = r;
        this.flightDistanceRight = this.game.width * 0.95;
        this.flightDistanceLeft = this.game.width * 0.05;
    }
}