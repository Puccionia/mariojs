import {Sides, Trait} from '../Entity.js';

export default class Breaker extends Trait {
    constructor() {
        super('breaker');

        this.tileCollision = true;
        this.break = true;
    }

   collides(me, them, side) {

        if (!this.tileCollision || !them.interactive) {
            return;
        }
       
        if(them.interactive.moving){
            me.bounds.top = them.bounds.bottom;
            me.vel.y = 0;
        }
        else if (side === Sides.BOTTOM) {
            me.bounds.bottom = them.bounds.top;
            me.vel.y = 0;
            
        }
        else if (side === Sides.TOP) {
            me.bounds.top = them.bounds.bottom;
            me.vel.y = 0;
            if(this.break && them.interactive.breakable){
                them.interactive.hitten = true;
            }
            else{
                them.interactive.tomove = true;
            }
        } 
        else if (side === Sides.LEFT) {
            me.bounds.left = them.bounds.right;
            me.vel.x = 0;
        }
        else if (side === Sides.RIGHT) {
            me.bounds.right = them.bounds.left;
            me.vel.x = 0;
        }
    }
}
