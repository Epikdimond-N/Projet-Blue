import {Game} from "./game.js";

let game = new Game("normal", 4);

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

    if (game.Win !== null){
        document.querySelector('.game-message').classList.add(game.Win? 'game-won': 'game-over');
        document.querySelector('.game-message').querySelector('p').innerText = game.Win? 'Vous avez gagné!': 'Jeu terminé!';
    }
})

document.querySelector('.restart-button').onclick = () => {
    document.querySelector(".tile-container2048").innerHTML = "";
    game = new Game("normal", 4);
}