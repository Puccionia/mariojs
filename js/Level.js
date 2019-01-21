import Compositor from './Compositor.js';
import EntityCollider from './EntityCollider.js';
import TileCollider from './TileCollider.js';
import { Matrix } from './math.js';

export default class Level {
    constructor() {
        this.gravity = 1500;
        this.totalTime = 0;

        this.comp = new Compositor();

        this.entities = new Set();
        this.items = new Set();
        this.effects = new Set();
        this.toadd = [];

        this.mainTiles = null;
        this.entityFactories = null;
        this.setting = null;

        this.entityCollider = new EntityCollider(this.entities);
        this.tileCollider = null;
    }

    setCollisionGrid(matrix) {
        this.tileCollider = new TileCollider(matrix);
    }

    update(deltaTime, camera) {
        this.items.forEach(entity => {
            if(entity.pos.x <= camera.pos.x + 304){
                entity.update(deltaTime, this);
            }
        });
        this.entities.forEach(entity => {
            if(entity.pos.x <= camera.pos.x + 304){
                entity.update(deltaTime, this);
            }
        });
        this.effects.forEach(entity => {
            entity.update(deltaTime, this);
        });


        this.items.forEach(entity => {
            this.entityCollider.check(entity);
        });
        this.entities.forEach(entity => {
            this.entityCollider.check(entity);
        });



        this.items.forEach(entity => {
            entity.finalize();
        });

        this.entities.forEach(entity => {
            entity.finalize();
        });


        this.totalTime += deltaTime;
    }
}
