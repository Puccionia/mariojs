import {Vec2} from './math.js';

export default class Camera {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.size = new Vec2(256, 224);
        this.lastposx = 0;
    }

    update(player) {
        this.pos.x = Math.max(this.lastposx, player.pos.x - 100);
        //this.lastposx = this.pos.x;
    }
}
