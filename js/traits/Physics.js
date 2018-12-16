import {Trait} from '../Entity.js';

export default class Physics extends Trait {
    constructor() {
        super('physics');

        this.enableGravity = true;
    }

    update(entity, deltaTime, level) {
        entity.pos.x += entity.vel.x * deltaTime;
        level.tileCollider.checkX(entity);
        level.entityCollider.checkX(entity);

        entity.pos.y += entity.vel.y * deltaTime;
        level.tileCollider.checkY(entity);
        level.entityCollider.checkY(entity);

        if(this.enableGravity) entity.vel.y += level.gravity * deltaTime;
    }
}
