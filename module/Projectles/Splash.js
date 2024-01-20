import { Projectile } from "./Projectile.js";

export class Splash extends Projectile {
    constructor(game, x, y, direct) {
        super(game, x, y, direct);
        this.image = document.getElementById('splash');
        this.flightDistanceRight = x + 100;
        this.flightDistanceLeft = x - 100;
        console.log(this.flightDistanceLeft)
    }
}