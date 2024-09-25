import {Game} from "./game.js";

const game = new Game();

document.addEventListener('keydown', async (e) => {
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
})
