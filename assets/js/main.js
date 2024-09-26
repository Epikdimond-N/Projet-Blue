import { Game } from "./game.js";

let game = new Game("element", 4);

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
        case 'r':
        case 'R':
            restartGame();
            break;
    }

    if (game.Win !== null) {
        document.querySelector('.game-message').classList.add(game.Win ? 'game-won' : 'game-over');
        document.querySelector('.game-message').querySelector('p').innerText = game.Win ? 'Vous avez gagné !' : 'Jeu terminé !';
    }
});

const restartButtons = document.querySelectorAll('.restart-fonction');

restartButtons.forEach(button => {
    button.onclick = restartGame;
});

function restartGame() {
    document.querySelector(".tile-container2048").innerHTML = "";
    game = new Game(game.Mode, 4);
    const gameMessage = document.querySelector('.game-message');
    gameMessage.classList.remove('game-won', 'game-over');
    gameMessage.querySelector('p').innerText = '';
}

function Element(){
    game = new Game("element", 4);
}

function Chrono(){
    game = new Game("chrono", 4);
}

function Normal(){
    game = new Game("normal", 4);
}

function Reverse(){
    game = new Game("reverse", 4);
}