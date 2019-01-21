import Entity, {Sides, Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import PendulumMove from '../traits/PendulumMove.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadGoomba() {
    return loadSpriteSheet('goomba')
    .then(sprite => createGoombaFactory(sprite, 'goomba'));
}


class Behavior extends Trait {
    constructor() {
        super('behavior');

        this.stomped = 0;
        this.stricken = 0;
    }

    collides(us, them) {

        if (us.killable.dead ) {
            if(!this.stomped && !this.stricken){
                this.stricken = 1;
                us.solid.tileObstructs = false;
                us.solid.entityCollides = false;
                us.solid.makeCollision = false; 
                us.pendulumMove.enabledOnTile = false;
                us.pendulumMove.enabledOnEntity = false;
                us.vel.set(100, -200);   
            }
            return;
        }

        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                this.stomped = 1;
                us.killable.kill();
                us.pendulumMove.speed = 0;
            } else {
                them.killable.kill();
            }
        }
    }
}


function createGoombaFactory(sprite, name) {
    const walkAnim = sprite.animations.get('walk');

    function routeAnim(goomba) {
        if (goomba.killable.dead) {
            if (goomba.behavior.stomped) { 
                return 'flat';
            }
            
            return 'stricken';
        
        }

        return walkAnim(goomba.lifetime);
    }

    function drawGoomba(context) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    return function createGoomba() {
        const goomba = new Entity();
        goomba.name = name;
        goomba.size.set(16, 16);

        goomba.addTrait(new Physics());
        goomba.addTrait(new Solid());
        goomba.addTrait(new PendulumMove());
        goomba.addTrait(new Behavior());
        goomba.addTrait(new Killable());

        goomba.draw = drawGoomba;
        return goomba;
    };
}
