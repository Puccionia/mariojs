import {Trait} from '../Entity.js';

export default class Interactive extends Trait {
    constructor() {
        super('interactive');

        this.tomove = false;
        this.moving = false;
        this.hitten = false;

        this.surprise = null;
        this.breakable = false;

        this.realPos = 0;
        this.spriteAfterMove = null;
    }

    update(us, deltaTime, level) {

        if(this.hitten == true) {
            return;
        }

        if (this.tomove === true) {
            var tile = level.mainTiles.get(us.pos.x / 16, us.pos.y / 16);
            tile.name = 'nothing';
            this.realPos = us.pos.y;
            //const createEntity = level.entityFactories['goomba'];
            //const entity = createEntity();
            //entity.pos.set(us.pos.x, us.pos.y);
            //level.items.add(entity);
            this.tomove = false;
            this.moving = true;
            us.vel.set(0, -80);
        }

        if(this.moving === true) {
            
            if((this.realPos - us.pos.y) > 7){
                us.vel.set(0, 80);
            }

            if((this.realPos - us.pos.y) < 0){
                this.moving = false;
                us.vel.set(0, 0);
                us.pos.y = this.realPos;
                
                var tile = level.mainTiles.get(us.pos.x / 16, us.pos.y / 16);
                tile.name = this.spriteAfterMove;
                if(!this.breakable) this.hitten = true;
                //tile.type = 'ground';

               //if(!this.breakable) level.entities.delete(us);
            }

        }
    }
}
