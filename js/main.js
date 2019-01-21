import Game from './Game.js';

const screen = document.getElementById('screen');
const bar = document.getElementById('editor');

const game = new Game();
game.run(screen, bar);

