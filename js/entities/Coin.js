import Entity, {Sides, Trait} from '../Entity.js';
import Physics from '../traits/Physics.js';



class Behavior extends Trait {
    constructor() {
        super('behavior');
    }

    update(us, deltaTime, level) {
        if(us.lifetime > 0.44){
            level.effects.delete(us);
        }

    }


}

export function createCoinFactory(sprite) {

    const coinAnim = sprite.animations.get('coin');

    function routeFrame(coin) {
        

        return coinAnim(coin.lifetime);
    }

    function drawCoin(context) {
        sprite.draw(routeFrame(this), context, 0, 0);
    }

    return function createCoint() {
        const coin = new Entity();
        coin.size.set(16, 16);
        coin.vel.set(0, -350);
        
        coin.addTrait(new Physics());
        coin.addTrait(new Behavior());


        coin.draw = drawCoin;
        return coin;
    }
}