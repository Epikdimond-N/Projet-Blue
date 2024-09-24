import {Game} from "./game.js";

const game = new Game();

document.addEventListener('keydown', (e) => {
    console.log('e', e);
    const grid = document.querySelector('.grid-container204');
    switch (e.key) {
        case 'ArrowLeft':
            game.move('left');
            break;
        case 'ArrowRight':
            game.move('right');
            break;
        case 'ArrowUp':
            game.move('up');
            break;
        case 'ArrowDown':
            game.move('down');
            break;
    }
    console.table(game.Grid);
})
