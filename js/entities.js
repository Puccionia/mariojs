import {loadMario} from './entities/Mario.js';
import {loadGoomba} from './entities/Goomba.js';
import {loadKoopa, loadBlueKoopa} from './entities/Koopa.js';
import {createBrickFactory} from './entities/Brick.js';
import {createQuestionFactory} from './entities/Question.js';
import {createFragmentFactory} from './entities/Fragment.js';
import {createCoinFactory} from './entities/Coin.js';
import {createMushroomFactory} from './entities/Mushroom.js';


export function loadEntities() {
    const entityFactories = {};

    function addAs(name) {
        return factory => entityFactories[name] = factory;
    }

    
    return Promise.all([
        loadMario().then(addAs('mario')),
        loadGoomba().then(addAs('goomba')),
        loadKoopa().then(addAs('koopa')),
        loadBlueKoopa().then(addAs('bluekoopa')),
    ])
    .then(() => entityFactories);
}

export function loadMisc(entityFactories, tileSprites, miscSprites) {

    function addAs(factory, name) {
        return entityFactories[name] = factory;
    }

    return Promise.all([
        addAs(createBrickFactory(tileSprites),'brick'),
        addAs(createQuestionFactory(tileSprites), 'question'),
        addAs(createFragmentFactory(miscSprites), 'fragment'),
        addAs(createCoinFactory(miscSprites), 'coin'),
        addAs(createMushroomFactory(miscSprites), 'mushroom'),

    ])
    .then(() => entityFactories);

}