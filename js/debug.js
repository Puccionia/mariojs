export function setupMouseControl(canvas, game, bar) {
    const camera = game.camera;

    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            var ratiox = 256 / event.target.clientWidth;
            var ratioy = 240 / event.target.clientHeight;
            var x = Math.floor(event.layerX * ratiox) + camera.pos.x;
            var y = Math.floor(event.layerY * ratioy) + camera.pos.y;
            if (event.buttons === 4 && camera.dragMode) {
                camera.pos.x -= event.movementX;
            }
            if (event.button === 3 && camera.dragMode) {
               /* var tile = game.level.mainTiles.get(Math.floor((x + camera.pos.x) / 16),Math.floor ((y + camera.pos.y) / 16));
                console.log(Math.floor((x + camera.pos.x) / 16),Math.floor ((y + camera.pos.y) / 16));
                if(!tile){
                    console.log('nulla');
                }
                else if(tile.name === 'bricks'){
                    tile.name = 'nothing';
                }
                else if(tile.name === 'nothing'){
                    tile.name = 'ground';
                } */
                const createEntity = game.factory['koopa'];
                const entity = createEntity();
                entity.pos.set(x, y);
                game.level.toadd.add(entity);
            }
        });
    });

    canvas.addEventListener('mouseup', event => {
        var ratiox = 256 / event.target.clientWidth;
        var ratioy = 240 / event.target.clientHeight;
        var x = Math.floor(event.layerX * ratiox) + camera.pos.x;
        var y = Math.floor(event.layerY * ratioy) + camera.pos.y;
        var tilex = Math.floor(x / 16);
        var tiley = Math.floor (y  / 16);
        var tile = game.level.mainTiles.get(tilex, tiley);
        if(game.editorMode){
            if(game.selected === 'ground'){
                if(event.button === 0){
                    if(!tile){
                        
                        game.level.mainTiles.set(tilex, tiley, {name: game.selected, type: 'ground', item: null});
                    }
                    else {
                        tile.name = 'ground';
                        tile.type = 'ground';
                        tile.item = null;
                    }
                }
                else if (event.button === 2){
                    
                    if (tile && tile.name == game.selected){
                        tile.name = 'nothing';
                        tile.type = null;
                    }
                }

            }

            else if(game.selected === 'chocolate'){
                if(event.button === 0){
                    if(!tile){
                        
                        game.level.mainTiles.set(tilex, tiley, {name: game.selected, type: 'ground', item: null});
                    }
                    else {
                        tile.name = game.selected;
                        tile.type = 'ground';
                        tile.item = null;
                    }
                }
                else if (event.button === 2){
                    
                    if (tile && tile.name == game.selected){
                        tile.name = 'nothing';
                        tile.type = null;
                    }
                }

            }

            else if(game.selected === 'hitten'){
                if(event.button === 0){
                    if(!tile){
                        
                        game.level.mainTiles.set(tilex, tiley, {name: game.selected, type: 'ground', item: null});
                    }
                    else {
                        tile.name = game.selected;
                        tile.type = 'ground';
                        tile.item = null;
                    }
                }
                else if (event.button === 2){
                    
                    if (tile && tile.name == game.selected){
                        tile.name = 'nothing';
                        tile.type = null;
                    }
                }

            }

            else if(game.selected === 'rock'){
                if(event.button === 0){
                    if(!tile){
                        
                        game.level.mainTiles.set(tilex, tiley, {name: game.selected, type: 'ground', item: null});
                    }
                    else {
                        tile.name = game.selected;
                        tile.type = 'ground';
                        tile.item = null;
                    }
                }
                else if (event.button === 2){
                    
                    if (tile && tile.name == game.selected){
                        tile.name = 'nothing';
                        tile.type = null;
                    }
                }

            }

            else if(game.selected === 'pipe-insert-vert-left'){
                if(event.button === 0){
                    if(!tile){
                        
                        game.level.mainTiles.set(tilex, tiley, {name: game.selected, type: 'ground', item: null});
                    }
                    else {
                        tile.name = game.selected;
                        tile.type = 'ground';
                        tile.item = null;
                    }
                }
                else if (event.button === 2){
                    
                    if (tile && tile.name == game.selected){
                        tile.name = 'nothing';
                        tile.type = null;
                    }
                }

            }
            else if(game.selected === 'pipe-insert-vert-right'){
                if(event.button === 0){
                    if(!tile){
                        
                        game.level.mainTiles.set(tilex, tiley, {name: game.selected, type: 'ground', item: null});
                    }
                    else {
                        tile.name = game.selected;
                        tile.type = 'ground';
                        tile.item = null;
                    }
                }
                else if (event.button === 2){
                    
                    if (tile && tile.name == game.selected){
                        tile.name = 'nothing';
                        tile.type = null;
                    }
                }

            }
            else if(game.selected === 'pipe-vert-left'){
                if(event.button === 0){
                    if(!tile){
                        
                        game.level.mainTiles.set(tilex, tiley, {name: game.selected, type: 'ground', item: null});
                    }
                    else {
                        tile.name = game.selected;
                        tile.type = 'ground';
                        tile.item = null;
                    }
                }
                else if (event.button === 2){
                    
                    if (tile && tile.name == game.selected){
                        tile.name = 'nothing';
                        tile.type = null;
                    }
                }

            }
            else if(game.selected === 'pipe-vert-right'){
                if(event.button === 0){
                    if(!tile){
                        
                        game.level.mainTiles.set(tilex, tiley, {name: game.selected, type: 'ground', item: null});
                    }
                    else {
                        tile.name = game.selected;
                        tile.type = 'ground';
                        tile.item = null;
                    }
                }
                else if (event.button === 2){
                    
                    if (tile && tile.name == game.selected){
                        tile.name = 'nothing';
                        tile.type = null;
                    }
                }

            }
            else if(game.selected === 'question'){
                if(event.button === 0){
                    if(!tile){
                        
                        game.level.mainTiles.set(tilex, tiley, {name: game.selected, type: 'question', item: null});
                    }
                    else {
                        tile.name = game.selected;
                        tile.type = 'question';
                        tile.item = null;
                    }
                }
                else if (event.button === 2){
                    
                    if (tile && tile.name == game.selected){
                        tile.name = 'nothing';
                        tile.type = null;
                    }
                }

            }
            else if(game.selected === 'brick'){
                if(event.button === 0){
                    if(!tile){
                        
                        game.level.mainTiles.set(tilex, tiley, {name: game.selected, type: 'brick', item: null});
                    }
                    else {
                        tile.name = game.selected;
                        tile.type = 'brick';
                        tile.item = null;
                    }
                }
                else if (event.button === 2){
                    
                    if (tile && tile.name == game.selected){
                        tile.name = 'nothing';
                        tile.type = null;
                    }
                }

            }
            else if(game.selected === 'mushroom'){
                if(event.button === 0){
                    if(!tile){
                        
                        game.level.mainTiles.set(tilex, tiley, {name: 'question', type: 'question', item: game.selected});
                    }
                    else {
                        tile.name = 'question';
                        tile.type = 'question';
                        tile.item = game.selected;
                    }
                }
                else if (event.button === 2){
                    
                    if (tile && tile.name == game.selected){
                        tile.name = 'nothing';
                        tile.type = null;
                        tile.item = null;
                    }
                }

            }
            else if(game.selected === 'koopa'){
                if(event.button === 0){
                    const createEntity = game.factory[game.selected];
                    const entity = createEntity();
                    entity.pos.set(x, y);
                    game.level.toadd.push(entity);
                }
                else if (event.button === 2){
                    
                    game.level.toadd.pop();
                }

            }
            else if(game.selected === 'goomba'){
                if(event.button === 0){
                    const createEntity = game.factory[game.selected];
                    const entity = createEntity();
                    entity.pos.set(x, y);
                    game.level.toadd.push(entity);
                }
                else if (event.button === 2){
                    
                    game.level.toadd.pop();
                }

            }
            else if(game.selected === 'bluekoopa'){
                if(event.button === 0){
                    const createEntity = game.factory[game.selected];
                    const entity = createEntity();
                    entity.pos.set(x, y);
                    game.level.toadd.push(entity);
                }
                else if (event.button === 2){
                    
                    game.level.toadd.pop();
                }

            }
            
        }

    });

    bar.addEventListener('mouseup', event => {
        var ratiox = 32 / event.target.clientWidth;
        var ratioy = 240 / event.target.clientHeight;
        var x = Math.floor((event.layerX - event.target.offsetLeft) * ratiox);
        var y = Math.floor(event.layerY * ratioy);
        if(game.editorMode && event.button === 0){
            game.regions.forEach( region => {
                if(region.hit(x, y)){ 
                    game.selected = region.name;
                    if(region.name === 'underworld' || region.name === 'overworld'){
                        game.level.setting = region.name;
                        game.toReset=true;
                    }
                }
            });
        }

    });

    

    canvas.addEventListener('contextmenu', event => {
        event.preventDefault();
    });
}
