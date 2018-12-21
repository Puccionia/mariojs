import Entity, {Sides, Trait} from '../Entity.js';
import Physics from '../traits/Physics.js';
import PendulumMove from '../traits/PendulumMove.js';
import Solid from '../traits/Solid.js';


class Behavior extends Trait {
    constructor() {
        super('behavior');

        this.emerged = false;
        this.distance = 0;
        this.collected = false;
    }

    update(us, deltaTime, level) {
        if(this.collected) {
            level.items.delete(us);
        }

        if(!this.emerged) {
            this.distance += -us.vel.y * deltaTime;
            if(this.distance >= 16){
                this.emerged = true;

                us.pendulumMove.enabledOnTile = true;
                us.pendulumMove.enabledOnEntity = true;
                us.solid.tileObstructs = true;
                us.physics.enableGravity = true;
                us.solid.entityCollides = true;


            }
        }

    }

    collides(us, them) {
        if (!this.emerged || (!them.super && !them.breaker)){
            return;
        }
        
        if( them.super ) {
            them.super.toTransform = true;
        }

        if( them.breaker ) {
            them.breaker.break = true;
        }

        this.collected = true;

    }


}

export function createMushroomFactory(sprite) {

    function routeFrame(mushroom) {
        return 'mushroom';
    }

    function drawMushroom(context) {
        sprite.draw(routeFrame(this), context, 0, 0);
    }

    return function createMushroom() {
        const mushroom = new Entity();
        mushroom.size.set(16, 16);
        mushroom.vel.set(0, -20);
        
        mushroom.addTrait(new Physics());
        mushroom.addTrait(new Solid());
        mushroom.addTrait(new PendulumMove());
        mushroom.addTrait(new Behavior());

        mushroom.pendulumMove.speed = 50;
        mushroom.pendulumMove.enabledOnTile = false;
        mushroom.pendulumMove.enabledOnEntity = false;
        mushroom.solid.tileObstructs = false;
        mushroom.solid.entityCollides = false;
        mushroom.solid.makeCollision = false;
        mushroom.physics.enableGravity = false;


        mushroom.draw = drawMushroom;
        return mushroom;
    }
}