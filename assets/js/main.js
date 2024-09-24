import {Game} from "./game.js";

const game = new Game();
let grid = document.querySelector('.tile-container2048');
displayGrid();

document.addEventListener('keydown', async (e) => {
    grid = document.querySelector('.tile-container2048');
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
    grid.innerHTML = '';
    displayGrid();
    console.log(game.Grid);
})

function displayGrid(){
    game.Grid.forEach((row) => {
        row.forEach((tile) => {
            if (tile.value !== 0) {
                grid.innerHTML += `
                    <div class="tile tile-${tile.value} tile-position-${tile.y + 1}-${tile.x + 1} ${tile.appear ? 'tile-new' : ''}">
                        <div class="tile-inner">
                            ${tile.value}
                         </div>
                    </div>
                        `
            }
        })
    });
}