import Entity, {Sides, Trait} from '../Entity.js';
import Physics from '../traits/Physics.js';



class Behavior extends Trait {
    constructor() {
        super('behavior');
    }

    update(us, deltaTime, level) {
        if(us.lifetime > 0.8){
            level.effects.delete(us);
        }

    }


}

export function createFragmentFactory(sprite) {

    const fragAnim = sprite.animations.get('fragment');

    function routeFrame(fragment) {
        

        return fragAnim(fragment.lifetime);
    }

    function drawFragment(context) {
        sprite.draw(routeFrame(this), context, 0, 0);
    }

    return function createFragment() {
        const fragment = new Entity();
        fragment.size.set(8, 8);
        
        fragment.addTrait(new Physics());
        fragment.addTrait(new Behavior());


        fragment.draw = drawFragment;
        return fragment;
    }
}