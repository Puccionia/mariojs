import KeyboardState from './KeyboardState.js';

export function setupControls(context, game) {
    const input = new KeyboardState();

    input.addMapping('KeyP', keyState => {
        if (keyState) {
            game.player.jump.start();
        } else {
            game.player.jump.cancel();
        }
    });

    input.addMapping('KeyO', keyState => {
        game.player.turbo(keyState);
    });

    input.addMapping('KeyD', keyState => {
        game.player.go.dir += keyState ? 1 : -1;
    });

    input.addMapping('KeyA', keyState => {
        game.player.go.dir += keyState ? -1 : 1;
    });

    input.addMapping('KeyS', keyState => {
        if (game.player.super.isSuper && keyState) game.player.super.crouching = true;
        else game.player.super.crouching = false;
    });

    input.addMapping('KeyE', keyState => {
        if(keyState) { 
            game.editorMode = !game.editorMode;
            game.showCollision = false;
            game.camera.setmode(game.editorMode);
            game.selected = null;
            game.toReset = !game.toReset;
        }
    });

    input.addMapping('KeyC', keyState => {
        if(keyState) { 

            if(!game.showCollision){
                game.level.comp.layers.push(game.collisionLayer);
                game.showCollision = true;
            }
            else{
                game.level.comp.layers.pop();
                game.showCollision = false;
            } 
            
        }
    });

    return input;
}
