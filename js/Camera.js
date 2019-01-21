import {Vec2} from './math.js';

export default class Camera {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.size = new Vec2(256, 224);
        this.lastposx = 0;
        this.dragMode = false;
    }

    update(player) {
        if (this.pos.x < 0) this.pos.x = 0;
        if (player.pos.x < 0) player.pos.x = this.pos.x;

        if (this.dragMode){
            return;
        }
        this.pos.x = Math.max(this.lastposx, player.pos.x - 100);
        //this.lastposx = this.pos.x;
    }

    setmode(editor){
        if(editor) this.dragMode = true;
        else this.dragMode = false;
    }
}
