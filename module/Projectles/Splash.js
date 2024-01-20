import { Projectile } from "./Projectile.js";

export class Splash extends Projectile {
    constructor(game, x, y, direct) {
        super(game, x, y, direct);
        this.image = document.getElementById('splash');
    }
}