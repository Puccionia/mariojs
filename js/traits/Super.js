import {Sides, Trait} from '../Entity.js';

export default class Super extends Trait {
    constructor() {
        super('super');

        this.isSuper = false;
        this.toTransform = false;

        this.transformTime = 0;

    }

    update(entity, deltaTime, level) {
        if (this.toTransform){
            this.transformTime += deltaTime;

            if(this.transformTime >= 1){
                this.isSuper = true;

                entity.breaker.break = true;
                entity.size.set(14, 32);
                entity.offset.y = 0;

                this.toTransform = false;
                this.transformTime = 0;
                
            }
        }
    }
}