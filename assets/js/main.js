import {Game} from "./game.js";
import {commenceTimer, resetTimer, startTimer} from "./timer.js";
import {getPositionValueCells} from "./utils.js";

let game = new Game();
let isTimerSet = false; // Indicateur pour savoir si un temps a été sélectionné
let lstTilesEvenListeners = []
let rem = true

document.querySelectorAll(".tile-container2048").forEach((tile) => {
    if (!tile.classList.contains('tile')) {
        tile.addEventListener("click", assignNeighboringTiles)
    }
})
if (game.Mode === "reverse"? game.Score< getBestScore("reverse"):getBestScore(game.Mode)> game.Score) updateBestScore(game.Score, game.Mode);
document.addEventListener('keydown', handleKeydown);

function handleKeydown(e) {
    // Ne pas permettre de bouger tant que le timer n'est pas défini (minutes non sélectionnées)
    if (!isTimerSet && game.Mode === "chrono") return;
    document.querySelector('.tile-container2048').querySelectorAll("div").forEach((tile) => removeAnimation(tile))

    lstTilesEvenListeners = [];
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

    if (game.Mode === "reverse" ? game.Score < getBestScore("reverse") : getBestScore(game.Mode)< game.Score) updateBestScore(game.Score, game.Mode);


    // Vérification de la victoire ou de la défaite
    if (game.Win !== null && (rem || game.Win === false)) {
        rem = false
        document.querySelector('.game-message').classList.add(game.checkLoss() ? 'game-over' :'game-won');
        document.querySelector('.game-message').querySelector('p').innerText = game.checkLoss() ? 'Jeu terminé !' :'Vous avez gagné !' ;
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

    document.querySelector(".tile-container2048").querySelectorAll("div").forEach((tile) => {
        if (!tile.classList.contains('tile') && !tile.classList.contains('tile-inner')) {
            tile.addEventListener("click", assignNeighboringTiles)
        }
    })
}

// Gestion des clics sur les boutons pour le timer
document.querySelectorAll('.container-btn-timer button').forEach(button => {
    button.onclick = function () {
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
    document.querySelector(".score-container2048").innerHTML = "0";
    isTimerSet = false;
    rem = true
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

function assignNeighboringTiles(e) {
    document.querySelector('.tile-container2048').querySelectorAll("div").forEach((tile) => removeAnimation(tile))
    document.querySelectorAll('.grid-cell').forEach((cell) => removeAnimation(cell))
    const parent = e.target.parentElement;
    const match = parent?.className.match(/tile-position-(\d+)-(\d+)/);
    let x, y
    if (match) {
        x = match[1] - 1;
        y = match[2] - 1;
    }

    if (parent.classList.contains('wind-cell')) {
        let sameCells = getPositionValueCells(game.Grid, game.Grid[y][x].value )
        sameCells.forEach((cell) => {
            if (cell.x !== y || cell.y !== x) document.querySelector(`.tile-position-${cell.y + 1}-${cell.x + 1}`).classList.add('wind-cell-selected-power');
        })

        let nullCells = getPositionValueCells(game.Grid, 0)
        nullCells.forEach((cell) => {
            document.querySelector(`.tile-null-position-${cell.y + 1}-${cell.x + 1}`).classList.add('wind-cell-selected-power');
        })

    }else {
        if (y >= 0 && y < 3) {
            if (game.Grid[y + 1][x].value !== 0) {
                document.querySelector(`.tile-position-${x + 1}-${y + 2}`).classList.add(game.Grid[y][x].element + '-cell-selected-power');
                document.querySelector(`.tile-position-${x + 1}-${y + 2}`).addEventListener("click", () => {
                    game.Grid[y][x].UsePower(game.Grid[y + 1][x])
                    if (allUnique(lstTilesEvenListeners)) lstTilesEvenListeners.push(game.Grid[y][x])
                });

            } // on check le bas
            if (x >= 0 && x < 3) {
                if (game.Grid[y][x + 1].value !== 0) {
                    document.querySelector(`.tile-position-${x + 2}-${y + 1}`).classList.add(game.Grid[y][x].element + '-cell-selected-power');
                    document.querySelector(`.tile-position-${x + 2}-${y + 1}`).addEventListener("click", () => {
                        game.Grid[y][x].UsePower(game.Grid[y][x + 1])
                        if (allUnique(lstTilesEvenListeners)) lstTilesEvenListeners.push(game.Grid[y][x])
                    });
                } // on check à droite
            }
            if (x <= 3 && x > 0) {
                if (game.Grid[y][x - 1].value !== 0) {
                    document.querySelector(`.tile-position-${x}-${y + 1}`).classList.add(game.Grid[y][x].element + '-cell-selected-power');
                    document.querySelector(`.tile-position-${x}-${y + 1}`).addEventListener("click", () => {
                        game.Grid[y][x].UsePower(game.Grid[y][x - 1])
                        if (allUnique(lstTilesEvenListeners)) lstTilesEvenListeners.push(game.Grid[y][x])
                    });
                } // on check a gauche
            }

            if (y > 0 && y <= 3) {
                if (game.Grid[y - 1][x].value !== 0) {
                    document.querySelector(`.tile-position-${x + 1}-${y}`).classList.add(game.Grid[y][x].element + '-cell-selected-power');
                    document.querySelector(`.tile-position-${x + 1}-${y}`).addEventListener("click", () => {
                        game.Grid[y][x].UsePower(game.Grid[y - 1][x])
                        if (allUnique(lstTilesEvenListeners)) lstTilesEvenListeners.push(game.Grid[y][x])
                    });
                } // on check le haut
            }
        }

        if (y <= 3 && y > 0) {
            if (game.Grid[y - 1][x].value !== 0) {
                document.querySelector(`.tile-position-${x + 1}-${y}`).classList.add(game.Grid[y][x].element + '-cell-selected-power');
                document.querySelector(`.tile-position-${x + 1}-${y}`).addEventListener("click", () => {
                    game.Grid[y][x].UsePower(game.Grid[y - 1][x])
                    if (allUnique(lstTilesEvenListeners)) lstTilesEvenListeners.push(game.Grid[y][x])
                });
            } // on check le bas
            if (x >= 0 && x < 3) {
                if (game.Grid[y][x + 1].value !== 0) {
                    document.querySelector(`.tile-position-${x + 2}-${y + 1}`).classList.add(game.Grid[y][x].element + '-cell-selected-power');
                    document.querySelector(`.tile-position-${x + 2}-${y + 1}`).addEventListener("click", () => {
                        game.Grid[y][x].UsePower(game.Grid[y][x + 1])
                        if (allUnique(lstTilesEvenListeners)) lstTilesEvenListeners.push(game.Grid[y][x])
                    });
                } // on check à droite
            }
            if (x <= 3 && x > 0) {
                if (game.Grid[y][x - 1].value !== 0) {
                    document.querySelector(`.tile-position-${x}-${y + 1}`).classList.add(game.Grid[y][x].element + '-cell-selected-power');
                    document.querySelector(`.tile-position-${x}-${y + 1}`).addEventListener("click", () => {
                        game.Grid[y][x].UsePower(game.Grid[y][x - 1])
                        if (allUnique(lstTilesEvenListeners)) lstTilesEvenListeners.push(game.Grid[y][x])
                    });
                } // on check a gauche
            }

            if (y > 0 && y <= 3) {
                if (game.Grid[y - 1][x].value !== 0) {
                    document.querySelector(`.tile-position-${x + 1}-${y}`).classList.add(game.Grid[y][x].element + '-cell-selected-power');
                    document.querySelector(`.tile-position-${x + 1}-${y}`).addEventListener("click", () => {
                        game.Grid[y][x].UsePower(game.Grid[y - 1][x])
                        if (allUnique(lstTilesEvenListeners)) lstTilesEvenListeners.push(game.Grid[y][x])
                    });
                } // on check le haut
            }
        }
    }
}

function removeAnimation(tile) {
    if (tile.classList.contains("flame-cell-selected-power")) {
        tile.classList.remove("flame-cell-selected-power");
    } else if (tile.classList.contains("earth-cell-selected-power")) {
        tile.classList.remove("earth-cell-selected-power");
    } else if (tile.classList.contains("wind-cell-selected-power")) {
        tile.classList.remove("wind-cell-selected-power");
    } else if (tile.classList.contains("water-cell-selected-power")) {
        tile.classList.remove("water-cell-selected-power");
    } else if (tile.classList.contains("flame-cell-selected")) {
        tile.classList.remove("flame-cell-selected");
    } else if (tile.classList.contains("earth-cell-selected")) {
        tile.classList.remove("earth-cell-selected");
    } else if (tile.classList.contains("wind-cell-selected")) {
        tile.classList.remove("wind-cell-selected");
    } else if (tile.classList.contains("water-cell-selected")) {
        tile.classList.remove("water-cell-selected");
    }
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


export {handleKeydown, restartGame, Element, Chrono, Normal, Reverse, getBestScore, updateBestScore ,lstTilesEvenListeners};