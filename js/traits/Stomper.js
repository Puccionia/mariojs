import {Sides, Trait} from '../Entity.js';

export default class Stomper extends Trait {
    constructor() {
        super('stomper');
        this.bounceSpeed = 400;

        this.onStomp = function() {
        }
    }

    bounce(us, them) {
        us.bounds.bottom = them.bounds.top;
        us.vel.y = -this.bounceSpeed;
    }

    collides(us, them) {
        if (!them.killable || them.killable.dead || them.interactive) {
            return;
        }

        if (us.vel.y > them.vel.y) {
            them.collides(us);
            this.bounce(us, them);
            this.onStomp(us, them);
        }
    }
}
