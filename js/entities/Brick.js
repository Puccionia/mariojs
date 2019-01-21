import Entity, {Sides, Trait} from '../Entity.js';
import Solid from '../traits/Solid.js';
import Interactive from '../traits/Interactive.js';
import Physics from '../traits/Physics.js';



class Behavior extends Trait {
    constructor() {
        super('behavior');
    }

    update(us, deltaTime, level) {

        if(us.interactive.hitten && us.interactive.breakable){
            const createFragment = level.entityFactories['fragment'];
            const tile = level.mainTiles.get(us.pos.x / 16, us.pos.y / 16);

            tile.name = 'nothing';

            this.fragspawn(us, level, createFragment);

            level.entities.delete(us);
        }

    }

    fragspawn(us, level, factory){
        
        var entity = factory();
        entity.pos.set(us.pos.x, us.pos.y);
        entity.vel.set(-50, -300);
        level.effects.add(entity);
        entity = factory();
        entity.pos.set(us.pos.x + 8, us.pos.y);
        entity.vel.set(50, -300);
        level.effects.add(entity);
        entity = factory();
        entity.pos.set(us.pos.x , us.pos.y + 8);
        entity.vel.set(-50, -200);
        level.effects.add(entity);
        entity = factory();
        entity.pos.set(us.pos.x + 8, us.pos.y + 8);
        entity.vel.set(50, -200);
        level.effects.add(entity);
    }

}

export function createBrickFactory(sprite, name) {

    function routeFrame(brick) {
       
        if(brick.interactive.moving === true){
            return 'brick';
        }
        
        return 'nothing';
    }

    function drawBrick(context) {
        sprite.draw(routeFrame(this), context, 0, 0);
    }

    return function createBrick() {
        const brick = new Entity();
        brick.name = name;
        brick.size.set(10, 16);
        
        brick.offset.x = 3;

        brick.addTrait(new Solid());
        brick.addTrait(new Physics());
        brick.addTrait(new Interactive());
        brick.addTrait(new Behavior());


        brick.solid.tileObstructs = false;
        brick.solid.entityCollides = false;
        brick.physics.enableGravity = false;
        brick.interactive.breakable = true;
        brick.interactive.spriteAfterMove = 'brick';

        brick.draw = drawBrick;
        return brick;
    }
}