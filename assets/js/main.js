import { Game } from "./game.js";

let game = new Game("element", 4);
document.querySelectorAll(".tile-container2048").forEach((tile)=>{
    if(!tile.classList.contains('tile')) {
        tile.addEventListener("click", assignNeighboringTiles)
    }
})

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
    console.log(document.querySelector(".tile-container2048"))

    document.querySelectorAll(".tile-container2048").forEach((tile)=>{
        if(!tile.classList.contains('tile')) {
            tile.addEventListener("click", assignNeighboringTiles)
        }
    })
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
    console.log(game.Grid[y][x])

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
