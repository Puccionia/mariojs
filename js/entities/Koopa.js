import Entity, {Sides, Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import PendulumMove from '../traits/PendulumMove.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadKoopa() {
    return loadSpriteSheet('koopa')
    .then(createKoopaFactory);
}

export function loadBlueKoopa() {
    return loadSpriteSheet('bluekoopa')
    .then(createKoopaFactory);
}

const STATE_WALKING = Symbol('walking');
const STATE_HIDING = Symbol('hiding');
const STATE_PANIC = Symbol('panic');
const STATE_DEAD = Symbol('stricken')

class Behavior extends Trait {
    constructor() {
        super('behavior');

        this.hideTime = 0;
        this.hideDuration = 5;

        this.walkSpeed = null;
        this.panicSpeed = 300;

        this.state = STATE_WALKING;
        this.stricken = 0;
    }

    collides(us, them) {
        if (us.killable.dead) {
            if(this.state !== STATE_DEAD){
                this.die(us);
            }
            return;
        }

        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                this.handleStomp(us, them);
            } else {
                this.handleNudge(us, them);
            }
        }
        else{
            if(this.state === STATE_PANIC) {
                this.panicSweep(us, them);
            }
        }
    }

    handleNudge(us, them) {
        if (this.state === STATE_WALKING) {
            them.killable.kill();
        } else if (this.state === STATE_HIDING) {
            this.panic(us, them);
        } else if (this.state === STATE_PANIC) {
            this.panicSweep(us, them);
        }
    }

    handleStomp(us, them) {
        if (this.state === STATE_WALKING) {
            this.hide(us);
        } else if (this.state === STATE_HIDING) {
           this.die(us);
        } else if (this.state === STATE_PANIC) {
            us.solid.entityCollides = true;
            us.solid.makeCollision = true;
            this.hide(us);
        }
    }

    panicSweep(us, them){
        const travelDir = Math.sign(us.vel.x);
        const impactDir = Math.sign(us.pos.x - them.pos.x);
        if (travelDir !== 0 && travelDir !== impactDir) {
            them.killable.kill();
        }
    }

    hide(us) {
        us.vel.x = 0;
        us.pendulumMove.enabledOnTile = false;
        us.pendulumMove.enabledOnEntity = false;
        if (this.walkSpeed === null) {
            this.walkSpeed = us.pendulumMove.speed;
        }
        this.hideTime = 0;
        this.state = STATE_HIDING
    }

    unhide(us) {
        us.pendulumMove.enabledOnTile = true;
        us.pendulumMove.enabledOnEntity = true;
        us.pendulumMove.speed = this.walkSpeed;
        this.state = STATE_WALKING;
    }

    panic(us, them) {
        us.solid.entityCollides = false;
        us.solid.makeCollision = false;
        us.pendulumMove.enabledOnTile = true;
        us.pendulumMove.speed = this.panicSpeed * Math.sign(them.vel.x);
        this.state = STATE_PANIC;
    }

    die(us){
        this.state = STATE_DEAD;
        us.killable.kill();
        us.solid.tileObstructs = false;
        us.solid.entityCollides = false;
        us.solid.makeCollision = false;
        us.pendulumMove.enabledOnTile = false;
        us.pendulumMove.enabledOnEntity = false;
        us.vel.set(100, -200);
        
    }

    update(us, deltaTime) {
        if (this.state === STATE_HIDING) {
            this.hideTime += deltaTime;
            if (this.hideTime > this.hideDuration) {
                this.unhide(us);
            }
        }
    }
}


function createKoopaFactory(sprite) {
    const walkAnim = sprite.animations.get('walk');
    const wakeAnim = sprite.animations.get('wake');

    function routeAnim(koopa) {

        if(koopa.behavior.state === STATE_DEAD){
            return 'stricken';
        }

        if (koopa.behavior.state === STATE_HIDING) {
            if (koopa.behavior.hideTime > 3) {
                return wakeAnim(koopa.behavior.hideTime);
            }
            return 'hiding';
        }

        if (koopa.behavior.state === STATE_PANIC) {
            return 'hiding';
        }

        return walkAnim(koopa.lifetime);
    }

    function drawKoopa(context) {
        sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
    }

    return function createKoopa() {
        const koopa = new Entity();
        koopa.size.set(16, 16);
        koopa.offset.y = 8;

        koopa.addTrait(new Physics());
        koopa.addTrait(new Solid());
        koopa.addTrait(new PendulumMove());
        koopa.addTrait(new Killable());
        koopa.addTrait(new Behavior());

        koopa.draw = drawKoopa;

        return koopa;
    };
}
