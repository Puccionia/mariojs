import {Sides, Trait} from '../Entity.js';

export default class PendulumMove extends Trait {
    constructor() {
        super('pendulumMove');
        this.enabledOnTile = true;
        this.enabledOnEntity = true;
        this.speed = -30;
    }

    obstruct(entity, side) {
        if(!this.enabledOnTile){
            return;
        }

        if (side === Sides.LEFT || side === Sides.RIGHT) {
            this.speed = -this.speed;
        }
    }

    collides(me, them, side) {
        if(!this.enabledOnEntity || !them.solid.makeCollision){
            return;
        }

        if (side === Sides.LEFT || side === Sides.RIGHT) {
            this.speed = -this.speed;
        }
    }

    update(entity, deltaTime) {
        if (this.enabledOnTile || this.enabledOnEntity) {
            entity.vel.x = this.speed;
        }
    }
}
