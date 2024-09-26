import { Game } from "./game.js";
import {commenceTimer, resetTimer, startTimer} from "./timer.js";

let game = new Game();
let isTimerSet = false; // Indicateur pour savoir si un temps a été sélectionné

document.addEventListener('keydown', handleKeydown);

function handleKeydown(e) {
    // Ne pas permettre de bouger tant que le timer n'est pas défini (minutes non sélectionnées)
    if (!isTimerSet && game.Mode ==="chrono") return;

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
            return;
    }

    if (game.Mode === "chrono") commenceTimer(); // Démarrer le timer au premier mouvement

    // Vérification de la victoire ou de la défaite
    if (game.Win !== null) {
        document.querySelector('.game-message').classList.add(game.Win ? 'game-won' : 'game-over');
        document.querySelector('.game-message').querySelector('p').innerText = game.Win ? 'Vous avez gagné !' : 'Jeu terminé !';
    }
}

// Gestion des clics sur les boutons pour le timer
document.querySelectorAll('.container-btn-timer button').forEach(button => {
    button.onclick = function() {
        const minutes = parseInt(this.innerText); // Récupérer les minutes à partir du texte du bouton
        startTimer(minutes); // Démarrer le timer à partir des minutes choisies
        isTimerSet = true; // Activer le mouvement une fois le temps sélectionné
    };
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
    resetTimer();
    isTimerSet = false; // Réinitialiser l'indicateur de sélection de temps
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

export { handleKeydown, restartGame, Element, Chrono, Normal, Reverse };