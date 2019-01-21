import {Vec2} from './math.js';

class Region {
    constructor(x,y,w,h,name) {
        this.pos = new Vec2(x, y);
        this.size = new Vec2(w, h);
        this.name = name;
    }

    hit(X,Y){
        if( X > this.pos.x && X < this.pos.x + this.size.x && Y > this.pos.y && Y < this.pos.y + this.size.y )
            return true;
        else false;
    }
}



export function setHitRegion(game) {

    game.regions = new Set();
    game.regions.add(new Region(0,0,16,16,"ground"));
    game.regions.add(new Region(16,0,16,16,"chocolate"));
    game.regions.add(new Region(0,16,16,16,"brick"));
    game.regions.add(new Region(16,16,16,16,"question"));
    game.regions.add(new Region(0,32,16,16,"hitten"));
    game.regions.add(new Region(16,32,16,16,"rock"));
    game.regions.add(new Region(0,48,16,16,"pipe-insert-vert-left"));
    game.regions.add(new Region(16,48,16,16,"pipe-insert-vert-right"));
    game.regions.add(new Region(0,64,16,16,"pipe-vert-left"));
    game.regions.add(new Region(16,64,16,16,"pipe-vert-right"));
    game.regions.add(new Region(0,80,16,16,"underworld"));
    game.regions.add(new Region(16,80,16,16,"overworld"));
    game.regions.add(new Region(0,96,16,24,"bluekoopa"));
    game.regions.add(new Region(16,96,16,24,"koopa"));
    game.regions.add(new Region(0,120,16,16,"goomba"));
    game.regions.add(new Region(16,120,16,16,"mushroom"));
}