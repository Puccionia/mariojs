import Entity from '../Entity.js';
import Go from '../traits/Go.js';
import Jump from '../traits/Jump.js';
import Killable from '../traits/Killable.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import Stomper from '../traits/Stomper.js';
import Breaker from '../traits/Breaker.js';
import Super from '../traits/Super.js';
import {loadSpriteSheet} from '../loaders.js';

const SLOW_DRAG = 1/1000;
const FAST_DRAG = 1/5000;

export function loadMario() {
    return loadSpriteSheet('mario')
    .then(sprite => createMarioFactory(sprite, 'mario'));
}

function createMarioFactory(sprite, name) {
    const runAnim = sprite.animations.get('run');
    const runAnimS = sprite.animations.get('S run');
    const transf = sprite.animations.get('transform');

    function routeFrame(mario) {

        if (mario.super.toTransform){
            return transf(mario.super.transformTime);
        }

        if (mario.jump.falling) {
            return 'jump';
        }

        if (mario.go.distance > 0) {
            if ((mario.vel.x > 0 && mario.go.dir < 0) || (mario.vel.x < 0 && mario.go.dir > 0)) {
                return 'break';
            }

            return runAnim(mario.go.distance);
        }
        return 'idle'
    }

    function routeFrameSuper(mario) {
        if (mario.super.crouching){
            return 'crouch';
        }

        if (mario.jump.falling) {
            return 'S jump';
        }

        if (mario.go.distance > 0) {
            if ((mario.vel.x > 0 && mario.go.dir < 0) || (mario.vel.x < 0 && mario.go.dir > 0)) {
                return 'S break';
            }

            return runAnimS(mario.go.distance);
        }
        return 'S idle';
    }

    function setTurboState(turboOn) {
        this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
    }

    function drawMario(context) {
        if (!this.super.isSuper){
            sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
        }
        else{
            sprite.draw(routeFrameSuper(this), context, 0, 0, this.go.heading < 0);
        }
    }

    return function createMario() {
        const mario = new Entity();
        mario.name = name;
        mario.size.set(14, 16);
        mario.offset.y = 16;
        mario.offset.x = 1;

        mario.addTrait(new Physics());
        mario.addTrait(new Solid());
        mario.addTrait(new Go());
        mario.addTrait(new Jump());
        mario.addTrait(new Killable());
        mario.addTrait(new Stomper());
        mario.addTrait(new Breaker());
        mario.addTrait(new Super());

        mario.solid.makeCollision = false;
        mario.solid.entityCollides = false;
        mario.killable.removeAfter = 0;

        mario.turbo = setTurboState;
        mario.draw = drawMario;

        mario.turbo(false);

        return mario;
    }
}
