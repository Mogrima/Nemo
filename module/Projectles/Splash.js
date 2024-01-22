import { Projectile } from "./Projectile.js";

export class Splash extends Projectile {
    constructor(game) {
        super(game);
        this.image = document.getElementById('splash');
        this.flightDistanceRight = this.game.player.collisionX + this.game.player.width + 100;
        this.flightDistanceLeft = this.game.player.collisionX - 100;
    }
}