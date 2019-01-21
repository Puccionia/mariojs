import {Matrix} from '../math.js';
import Level from '../Level.js';
import {createSpriteLayer} from '../layers/sprites.js';
import {createBackgroundLayer} from '../layers/background.js';
import {loadJSON, loadSpriteSheet} from '../loaders.js';
import {loadMisc} from '../entities.js';

/*function setupCollision(levelSpec, level) {
    const mergedTiles = levelSpec.layers.reduce((mergedTiles, layerSpec) => {
        return mergedTiles.concat(layerSpec.tiles);
    }, []);
    const collisionGrid = createCollisionGrid(mergedTiles, levelSpec.patterns);
    level.setCollisionGrid(collisionGrid);
}*/

function setupBackgrounds(levelSpec, level, backgroundSprites) {

    levelSpec.layers.forEach(layer => {
        const backgroundGrid = createBackgroundGrid(layer.tiles, levelSpec.patterns);
        level.mainTiles = backgroundGrid;
        const backgroundLayer = createBackgroundLayer(level, backgroundGrid, backgroundSprites);
        level.comp.layers.push(backgroundLayer);

    });

}

function barLayerDraw(tiles, sprites, barcontext){
    const buffer = document.createElement('canvas');
    buffer.width = 256 + 16;
    buffer.height = 240;

    const context1 = buffer.getContext('2d');

    for (let x = 0; x <= 1; ++x) {
        const col = tiles.grid[x];
        if (col) {
            col.forEach((tile, y) => {
                sprites.drawTile(tile.name, context1, x, y);   
            });
        }
    }
    barcontext.drawImage(buffer,
        0,
        0);

}

function barEnemiesrDraw(entities, context){
    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = 64;
    spriteBuffer.height = 64;
    const spriteBufferContext = spriteBuffer.getContext('2d');

    
    entities.forEach(entity => {
        spriteBufferContext.clearRect(0, 0, 64, 64);

        entity.draw(spriteBufferContext);

        context.drawImage(
            spriteBuffer,
            entity.pos.x,
            entity.pos.y );
    });
    
}



function drawBar(levelSpec, backgroundSprites, context, game){
    levelSpec.layers.forEach(layer => {
        const backgroundGrid = createBackgroundGrid(layer.tiles, levelSpec.patterns);
        barLayerDraw(backgroundGrid, backgroundSprites, context);
    });
    const enemies = new Set();
    levelSpec.entities.forEach(({name, pos: [x, y]}) => {
        const createEntity = game.factory[name];
        const entity = createEntity();
        entity.pos.set(x, y);
        enemies.add(entity);
    });
    barEnemiesrDraw(enemies, context);

}

function resetupBackgrounds(levelSpec, level, backgroundSprites, oldtiles) {
    setupBackgrounds(levelSpec, level, backgroundSprites);
    level.comp.layers.pop();
    const mainbg= createBackgroundLayer(level, oldtiles, backgroundSprites);
    level.comp.layers.push(mainbg);
    level.mainTiles = oldtiles;


}


function setupEntities(levelSpec, level, game) {

    levelSpec.entities.forEach(({name, pos: [x, y]}) => {
        const createEntity = game.factory[name];
        const entity = createEntity();
        entity.pos.set(x, y);
        level.entities.add(entity);
    });

    level.mainTiles.forEach((tile, x, y) => {
        if(tile.type === 'brick' || tile.type === 'question'){
            const createEntity = game.factory[tile.type];
            const entity = createEntity();
            entity.pos.set(x * 16, y * 16);
            if(tile.item){
                 entity.interactive.surprise = game.factory[tile.item];
                 entity.interactive.breakable = false;
            }
            else entity.interactive.surprise = null;
            level.entities.add(entity);
        }
    });

    const itemsLayer = createSpriteLayer(level.items);
    level.comp.layers.push(itemsLayer);
    const entitiesLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(entitiesLayer);

    if(game.editorMode){
        const editorLayer = createSpriteLayer(level.toadd);
        level.comp.layers.push(editorLayer);
    }
    
    const effectsLayer = createSpriteLayer(level.effects);
    level.comp.layers.push(effectsLayer);
}

export function createLevelLoader(game, bcontext) {
    return async function loadLevel(name) {
        return loadJSON(`./levels/${name}.json`)
        .then(levelSpec => Promise.all([
            levelSpec,
            loadJSON(`./levels/Bar.json`),
            loadSpriteSheet(levelSpec.spriteSheet),
            loadSpriteSheet(levelSpec.spriteSheet + "items")
        ]))
        .then(([levelSpec, barSpec, tileSprites, itemSprites]) => {
            const level = new Level();


            level.entityFactories = game.factory;
            level.setting = levelSpec.spriteSheet;

            setupBackgrounds(levelSpec, level, tileSprites);
            level.setCollisionGrid(level.mainTiles);

            loadMisc(game.factory, tileSprites, itemSprites);

            drawBar(barSpec, tileSprites, bcontext, game);

            setupEntities(levelSpec, level, game);


            return level;
        });
    }
}

function setAnimTile(game){

        game.level.mainTiles.forEach((tile) => {
            if(tile.type ===  'question' ){
                tile.name = 'question'
            }
            else if(tile.type === 'brick'){
                tile.name = 'brick'
            }
        });  
}

export function createReloader(game) {
    return async function loadLevel(name) {
        return loadJSON(`./levels/${name}.json`)
        .then(levelSpec => Promise.all([
            levelSpec,
            loadSpriteSheet(game.level.setting),
            loadSpriteSheet(game.level.setting + "items")
        ]))
        .then(([levelSpec, tileSprites, itemSprites]) => {
            const level = new Level();


            level.entityFactories = game.factory;
            level.setting = game.level.setting;

            resetupBackgrounds(levelSpec, level, tileSprites, game.level.mainTiles);
            setAnimTile(game);

            level.setCollisionGrid(level.mainTiles);

            loadMisc(game.factory, tileSprites, itemSprites);

            setupEntities(levelSpec, level, game);
            game.level.toadd.forEach(function(entity){
                const create = game.factory[entity.name];
                const ent = create();
                ent.pos.set(entity.pos.x, entity.pos.y);
                level.entities.add(ent);
                level.toadd.push(entity);
            });


            return level;
        });
    }
}
/*
function createCollisionGrid(tiles, patterns) {
    const grid = new Matrix();

    for (const {tile, x, y} of expandTiles(tiles, patterns)) {
        grid.set(x, y, {type: tile.type});
    }

    return grid;
}
*/
function createBackgroundGrid(tiles, patterns) {
    const grid = new Matrix();

    for (const {tile, x, y} of expandTiles(tiles, patterns)) {
        grid.set(x, y, {name: tile.name, type: tile.type, item: tile.item});
    }

    return grid;
}


function* expandSpan(xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;
    for (let x = xStart; x < xEnd; ++x) {
        for (let y = yStart; y < yEnd; ++y) {
            yield {x, y};
        }
    }
}

function expandRange(range) {
    if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range;
        return expandSpan(xStart, xLen, yStart, yLen);

    } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        return expandSpan(xStart, xLen, yStart, 1);

    } else if (range.length === 2) {
        const [xStart, yStart] = range;
        return expandSpan(xStart, 1, yStart, 1);
    }
}

function* expandRanges(ranges) {
    for (const range of ranges) {
        yield* expandRange(range);
    }
}

function* expandTiles(tiles, patterns) {
    function* walkTiles(tiles, offsetX, offsetY) {
        for (const tile of tiles) {
            for (const {x, y} of expandRanges(tile.ranges)) {
                const derivedX = x + offsetX;
                const derivedY = y + offsetY;

                if (tile.pattern) {
                    const tiles = patterns[tile.pattern].tiles;
                    yield* walkTiles(tiles, derivedX, derivedY);
                } else {
                    yield {
                        tile,
                        x: derivedX,
                        y: derivedY,
                    };
                }
            }
        }
    }

    yield* walkTiles(tiles, 0, 0);
}
