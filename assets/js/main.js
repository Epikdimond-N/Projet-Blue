import { Game } from "./game.js";
import {commenceTimer, resetTimer, startTimer} from "./timer.js";

let game = new Game();
let isTimerSet = false; // Indicateur pour savoir si un temps a été sélectionné

document.querySelectorAll(".tile-container2048").forEach((tile)=>{
    if(!tile.classList.contains('tile')) {
        tile.addEventListener("click", assignNeighboringTiles)
    }
})
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
    if (document.querySelector('.game-message').classList.contains('game-won')) {
        document.removeEventListener('keydown', handleKeydown);
    }
    const continueBtn = document.querySelector('.keep-playing-button');
    const gameMessage = document.querySelector('.game-message');

    continueBtn.addEventListener('click', () => {
        document.addEventListener('keydown', handleKeydown);
        gameMessage.classList.remove('game-won');
        game.Win = null;
    });

    document.querySelectorAll(".tile-container2048").forEach((tile)=>{
        if(!tile.classList.contains('tile')) {
            tile.addEventListener("click", assignNeighboringTiles)
        }
    })
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

function assignNeighboringTiles(e){
    const parentClass = e.target.parentElement;
    const match = parentClass.className.match(/tile-position-(\d+)-(\d+)/);
    let x, y
    if (match) {
        x = match[1] - 1;
        y = match[2] - 1;
        console.log(`x: ${x}, y: ${y}`);
    }
    parentClass.classList.add(game.Grid[y][x].element + "-cell-selected")

    if (y >= 0 && y < 3){
        if(game.Grid[y+1][x].value !== 0){
            document.querySelector(`.tile-position-${x+1}-${y+2}`).classList.add(game.Grid[y][x].element+'-cell-selected-power');
        } // on check le bas
        if (x >=0 && x<3){
            if(game.Grid[y][x+1].value !== 0){
                document.querySelector(`.tile-position-${x+2}-${y+1}`).classList.add(game.Grid[y][x].element+'-cell-selected-power');
            } // on check à droite
        }
        if (x<=3 && x>0){
            if(game.Grid[y][x-1].value !== 0){
                document.querySelector(`.tile-position-${x}-${y+1}`).classList.add(game.Grid[y][x].element+'-cell-selected-power');
            } // on check a gauche
        }

        if(y > 0 && y <=3){
            if(game.Grid[y-1][x].value !== 0){
                document.querySelector(`.tile-position-${x+1}-${y}`).classList.add(game.Grid[y][x].element+'-cell-selected-power');
            } // on check le haut
        }
    }

    if (y <= 3 && y > 0){
        if(game.Grid[y-1][x].value !== 0){
            document.querySelector(`.tile-position-${x+1}-${y}`).classList.add(game.Grid[y][x].element+'-cell-selected-power');
        } // on check le bas
        if (x >=0 && x<3){
            if(game.Grid[y][x+1].value !== 0){
                document.querySelector(`.tile-position-${x+2}-${y+1}`).classList.add(game.Grid[y][x].element+'-cell-selected-power');
            } // on check à droite
        }
        if (x<=3 && x>0){
            if(game.Grid[y][x-1].value !== 0){
                document.querySelector(`.tile-position-${x}-${y+1}`).classList.add(game.Grid[y][x].element+'-cell-selected-power');
            } // on check a gauche
        }

        if(y > 0 && y <=3){
            if(game.Grid[y-1][x].value !== 0){
                document.querySelector(`.tile-position-${x+1}-${y}`).classList.add(game.Grid[y][x].element+'-cell-selected-power');
            } // on check le haut
        }
    }

}


export { handleKeydown, restartGame, Element, Chrono, Normal, Reverse };