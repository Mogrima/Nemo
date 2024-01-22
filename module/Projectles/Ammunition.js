import { Projectile } from "./Projectile.js";

export class Ammunition extends Projectile {
    constructor(game) {
        super(game);
        this.image = document.getElementById('projectile3');
        this.flightDistanceRight = this.game.width * 0.95;
        this.flightDistanceLeft = this.game.width * 0.05;
    }
}