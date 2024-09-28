import {Game} from "./game.js";
import {commenceTimer, resetTimer, startTimer} from "./timer.js";
import {getPositionValueCells} from "./utils.js";
import {ElementTypes} from "./tiles.js";

let game = new Game();//Initialise le jeu
let isTimerSet = false; // Indicateur pour savoir si un temps a été sélectionné
let TilesEvenListeners = null // Tiles qui active son pouvoir
let rem = true // Indicateur pour savoir si le jeu a été redémarré

document.addEventListener('keydown', handleKeydown);//Ajoute l'event keydown pour les touches fléchées

//Assigne aux tiles avec pouvoir l'event click au début de partie
document.querySelectorAll(".tile-container2048").forEach((tile) => {
    if (!tile.classList.contains('tile')) {
        tile.addEventListener("click", assignNeighboringTiles)
    }
})

//Update le meilleur score selon le mode
if (game.Mode === "reverse" ? game.Score < getBestScore("reverse") : getBestScore(game.Mode) > game.Score) {
    updateBestScore(game.Score, game.Mode);
}

//Start le timer
document.querySelectorAll('.container-btn-timer button').forEach(button => {
    button.onclick = function () {
        startTimer(parseInt(this.innerText));
        isTimerSet = true;
    };
});

//Restart le jeu
document.querySelectorAll('.restart-fonction').forEach(button => button.onclick = restartGame);

function handleKeydown(e) {
    // Ne pas permettre de bouger tant que le timer n'est pas défini (minutes non sélectionnées)
    if (!isTimerSet && game.Mode === "chrono") return;
    //Enlève les animations des tiles et des cellules
    document.querySelector('.tile-container2048').querySelectorAll("div").forEach((tile) => removeAnimation(tile))
    //reset a chaque keydown
    TilesEvenListeners = null;
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
    //Chrono mode commence après le premier mouvement
    if (game.Mode === "chrono") commenceTimer(); // Démarrer le timer au premier mouvement
    //Update le score
    if (game.Mode === "reverse" ? game.Score < getBestScore("reverse") : getBestScore(game.Mode) < game.Score) updateBestScore(game.Score, game.Mode);


    // Vérification de la victoire ou de la défaite
    if (game.Win !== null && (rem || game.Win === false)) {
        rem = false
        document.querySelector('.game-message').classList.add(game.checkLoss() ? 'game-over' : 'game-won');
        document.querySelector('.game-message').querySelector('p').innerText = game.checkLoss() ? 'Jeu terminé !' : 'Vous avez gagné !';
        if (game.Win) {
            document.removeEventListener('keydown', handleKeydown);
        }
    }

    //Continue le jeu après la victoire
    document.querySelector('.keep-playing-button').addEventListener('click', () => {
        document.addEventListener('keydown', handleKeydown);
        document.querySelector('.game-message').classList.remove('game-won');
        game.Win = null;
    });

    //Affichage des tiles qui peuvent subir un pouvoir
    document.querySelector(".tile-container2048").addEventListener("click", (ev) => {
        const tile = ev.target;
        if (!tile.classList.contains('tile') && !tile.classList.contains('tile-inner')) {
            assignNeighboringTiles.call(tile);
        }
    });

    document.querySelector('.tile-container2048').querySelectorAll("div").forEach((tile) => removeAnimation(tile))
    document.querySelectorAll('.grid-cell').forEach((cell) => removeAnimation(cell))
}

function restartGame() {
    document.querySelector(".tile-container2048").innerHTML = "";
    game = new Game(game.Mode, 4);
    const gameMessage = document.querySelector('.game-message');
    gameMessage.classList.remove('game-won', 'game-over');
    gameMessage.querySelector('p').innerText = '';
    resetTimer();
    document.querySelector(".score-container2048").innerHTML = "0";
    isTimerSet = false;
    rem = true
}

function assignNeighboringTiles(e) {
    document.querySelector('.tile-container2048').querySelectorAll("div").forEach((tile) => removeAnimation(tile))
    document.querySelectorAll('.grid-cell').forEach((cell) => removeAnimation(cell))
    const parent = e.target.classList.contains('tile-inner') ? e.target.parentElement : e.target;

    if (!parent || (parent.classList.contains('tile') && parent.classList.contains('tile-inner'))) return;

    const match = parent?.className.match(/tile-position-(\d+)-(\d+)/);
    let x, y
    if (match) {
        x = match[1] - 1;
        y = match[2] - 1;
    }

    if (parent.classList.contains('wind-cell')) {
        let nullCells = getPositionValueCells(game.Grid, 0); // Obtient les positions des tiles vides
        handleCellSelection(nullCells, y, x, 'null-');

        let sameCells = getPositionValueCells(game.Grid, game.Grid[y][x].value);//Obtient les positions des tiles avec la même valeur que celle cliqué
        handleCellSelection(sameCells, y, x);
    } else {
        // Vérifier en bas
        if (y < 3) {
            handleNeighboringTile(x, y + 1, x, y);
        }
        // Vérifier à droite
        if (x < 3) {
            handleNeighboringTile(x + 1, y, x, y);
        }
        // Vérifier à gauche
        if (x > 0) {
            handleNeighboringTile(x - 1, y, x, y);
        }
        // Vérifier en haut
        if (y > 0) {
            handleNeighboringTile(x, y - 1, x, y);
        }
    }
}

function handleClick(targetX, targetY, sourceX, sourceY) {
    return function () {
        TilesEvenListeners = game.Grid[sourceY][sourceX];
        game.Grid[sourceY][sourceX].UsePower(game.Grid[targetY][targetX]);
    };
}

function handleNeighboringTile(targetX, targetY, sourceX, sourceY) {
    const clickHandler = handleClick(targetX, targetY, sourceX, sourceY);
    if (game.Grid[targetY][targetX].value !== 0) {
        document.querySelector(`.tile-position-${targetX + 1}-${targetY + 1}`).classList.add(game.Grid[sourceY][sourceX].element + '-cell-selected-power');
        document.querySelector(`.tile-position-${targetX + 1}-${targetY + 1}`).addEventListener("click", clickHandler);
    }
}

function handleCellSelection(cells, y, x, classNamePrefix = '') {
    cells.forEach((cell) => {
        if (!(cell.x === y && cell.y === x)) {
            const clickHandler = handleClick(cell.y, cell.x, x, y);
            const tileElement = document.querySelector(`.tile-${classNamePrefix}position-${cell.y + 1}-${cell.x + 1}`);
            tileElement.classList.add(`wind-cell-selected-power`);
            tileElement.addEventListener("click", clickHandler);
        }
    });
}

export function removeAnimation(tile) {
    ElementTypes.forEach(element => {
        tile.classList.remove(`${element}-cell-selected-power`);
        tile.classList.remove(`${element}-cell-selected`);
    });
}

function allUnique(arr) {
    const uniqueSet = new Set(arr);
    return uniqueSet.size === arr.length;
}

function updateBestScore(newScore, mode) {
    localStorage.setItem(mode, newScore)
}

function getBestScore(move) {
    let bestScore = localStorage.getItem(move);
    return bestScore ? parseInt(bestScore) : 0;
}

function Element() {
    game = new Game("element", 4);
    rem = true
}

function Chrono() {
    game = new Game("chrono", 4);
    rem = true
}

function Normal() {
    game = new Game("normal", 4);
    rem = true
}

function Reverse() {
    game = new Game("reverse", 4);
    rem = true
}

export {
    handleKeydown,
    restartGame,
    Element,
    Chrono,
    Normal,
    Reverse,
    getBestScore,
    updateBestScore,
    TilesEvenListeners
};