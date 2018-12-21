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
            if(!this.breakable && !this.surprise){
                const createCoin = level.entityFactories['coin'];
                const coin = createCoin();
                coin.pos.set(us.pos.x, us.pos.y - 10);
                level.effects.add(coin);
            }
            this.tomove = false;
            this.moving = true;
            us.solid.makeCollision = false;
            us.vel.set(0, -80);
        }

        if(this.moving === true) {
            us.solid.makeCollision = true;
            
            if((this.realPos - us.pos.y) > 7){
                us.vel.set(0, 80);
            }

            if((this.realPos - us.pos.y) < 0){
                this.moving = false;
                us.vel.set(0, 0);
                us.pos.y = this.realPos;
                
                var tile = level.mainTiles.get(us.pos.x / 16, us.pos.y / 16);
                
                if(!this.breakable){
                    console.log("we");
                    if(this.surprise){
                        const spawn = this.surprise();
                        spawn.pos.set(us.pos.x, us.pos.y);
                        level.items.add(spawn);
                    }
                    this.hitten = true;
                    tile.name = 'hitten';
                } 
                else{
                    tile.name = this.spriteAfterMove;
                }
            }

        }
    }

    collides(us, them, side){
        if(!them.breaker && them.killable){
            them.killable.kill();
        }
    }
}
