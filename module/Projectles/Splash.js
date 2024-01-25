import { Projectile } from "./Projectile.js";

export class Splash extends Projectile {
    constructor(game, r) {
        super(game, r);
        this.image = document.getElementById('splash');
        this.r = r;
        this.flightDistanceRight = this.game.width * 0.95;
        this.flightDistanceLeft = this.game.width * 0.05;
    }
}