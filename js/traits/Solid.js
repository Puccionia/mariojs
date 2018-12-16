import {Sides, Trait} from '../Entity.js';

export default class Solid extends Trait {
    constructor() {
        super('solid');
        this.tileObstructs = true;
        this.entityCollides = true;
        this.makeCollision = true;
    }

    obstruct(entity, side, match) {
        if (!this.tileObstructs) {
            return;
        }

        if (side === Sides.BOTTOM) {
            entity.bounds.bottom = match.y1;
            entity.vel.y = 0;
        } else if (side === Sides.TOP) {
            entity.bounds.top = match.y2;
            entity.vel.y = 0;
        } else if (side === Sides.LEFT) {
            entity.bounds.left = match.x2;
            entity.vel.x = 0;
        } else if (side === Sides.RIGHT) {
            entity.bounds.right = match.x1;
            entity.vel.x = 0;
        }
    }

   collides(me, them, side) {
        if (!this.entityCollides || !them.solid.makeCollision) {
            return;
        }
       
        if (side === Sides.BOTTOM) {
            me.bounds.bottom = them.bounds.top;
            me.vel.y = 0;
        } else if (side === Sides.TOP) {
            me.bounds.top = them.bounds.bottom;
            me.vel.y = 0;
        } else if (side === Sides.LEFT) {
            me.bounds.left = them.bounds.right;
            me.vel.x = 0;
        } else if (side === Sides.RIGHT) {
            me.bounds.right = them.bounds.left;
            me.vel.x = 0;
        }
    }
}
