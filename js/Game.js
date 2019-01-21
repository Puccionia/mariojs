import Camera from './Camera.js';
import Entity from './Entity.js';
import PlayerController from './traits/PlayerController.js';
import Timer from './Timer.js';
import {createLevelLoader, createReloader} from './loaders/level.js';
import {loadFont} from './loaders/font.js';
import {loadEntities} from './entities.js';
import {setupControls} from './input.js';
import {setupMouseControl} from './debug.js'
import {createCollisionLayer} from './layers/collision.js';
import {createDashboardLayer} from './layers/dashboard.js';
import { setHitRegion } from './regions.js';

export default class Game {
    constructor() {
        this.editorMode = false;
        this.toReset = false;
        this.showCollision = false;

        this.factory = null;
        this.font = null;
        this.loader = null;
        this.reloader = null;

        this.regions = null;
        this.selected = null;

        this.collisionLayer = null;

        this.level = null;
        this.timer = null;
        this.camera = null;
        this.input = null;
        this.player = null;
        this.pEnv = null;
    }

    createPlayerEnv(playerEntity) {
        const playerEnv = new Entity();
        const playerControl = new PlayerController();
        playerControl.checkpoint.set(64, 64);
        playerControl.setPlayer(playerEntity);
        playerEnv.addTrait(playerControl);
        return playerEnv;
    }

    async reset() {
        this.level = await this.reloader('1-1');
        this.collisionLayer = createCollisionLayer(this.level);
        this.player = this.factory.mario();
        this.pEnv = this.createPlayerEnv(this.player);
        this.level.entities.add(this.pEnv);
        this.level.comp.layers.push(createDashboardLayer(this.font, this.pEnv));


    }
    
    async run(canvas, bar) {
        const context = canvas.getContext('2d');
        const barctx = bar.getContext('2d');

        [this.factory, this.font] = await Promise.all([
            loadEntities(),
            loadFont(),
        ]);
        this.loader = await createLevelLoader(this, barctx);
        this.reloader = await createReloader(this);
        this.level = await this.loader('1-1');


        this.player  = this.factory.mario();
        this.pEnv = this.createPlayerEnv(this.player);
        this.level.entities.add(this.pEnv);

        
        this.camera = new Camera();

        this.collisionLayer = createCollisionLayer(this.level);

        this.level.comp.layers.push(createDashboardLayer(this.font, this.pEnv));

        setHitRegion(this);
        this.input = setupControls(context, this);
        setupMouseControl(canvas, this, bar);
        this.input.listenTo(window);
        this.timer = new Timer(1/60, this);

        this.timer.update = async function update(deltaTime, game) {

            if(game.toReset){
                await game.reset();
                game.toReset = false;
            }

            if(!game.editorMode){
                 game.level.update(deltaTime, game.camera);
            }
            game.camera.update(game.player);
            
     
            game.level.comp.draw(context, game.camera);
             
         }
     
        this.timer.start();
       
    }

}