//Class du jeu

import {Tiles} from "./tiles.js";
import {Elements} from "./elements.js";

export class Game {

    constructor(mode = "normal" ,dimension = 4 ,time = null) {
        this.Score = 0;
        this.Mode = mode;
        this.Grid = this.CreateGrill(dimension)
        this.RandomTiles(2)
        this.Time = time;
    }

    CreateGrill(dimension) {
        return [...Array(dimension)].map((_, x) => Array(dimension).fill(null).map((_, y) => new Tiles(x, y)));
    }

    RandomTiles(cellNum = 1) {
        let x = Math.floor(Math.random() * 4);
        let y = Math.floor(Math.random() * 4);

        if (this.Grid[x][y].value !== 0){
            this.RandomTiles();
        }
        if (this.Mode === "element") {
            this.Grid[x][y] = new Tiles(x,y,true,(Math.random() < 0.17) ? 4 : 2);

            if (Math.random() <= 0.02) {
                this.Grid[x][y].element(new Elements("fire"));
            } else if (Math.random() <= 0.04) {
                this.Grid[x][y].element(new Elements("water"));
            } else if (Math.random() <= 0.06) {
                this.Grid[x][y].element(new Elements("earth"));
            } else if (Math.random() <= 0.08) {
                this.Grid[x][y].element(new Elements("air"));
            }

        } else if (this.Mode === "reverse") {
            this.Grid[x][y] = new Tiles(x,y,true,(Math.random() < 0.17) ? 65536 : 131072);

        } else {
            const numbers = [...Array(cellNum)].map(getRandomStartNumber);

            const emptyCells = getPositionEmptyCells(this.Grid);
            const selectedCells = getRandomEmptyCells(cellNum, emptyCells)

            selectedCells.forEach((cellPosition, index) => {
                this.Grid[cellPosition.x][cellPosition.y] = new Tiles(cellPosition.x , cellPosition.y ,true, numbers[index]);
                addCell(cellPosition, numbers[index] );

            });
        }
    }

    move(direction) {
        let moved = false;

        switch (direction) {
            case 'up':
                moved = this.moveUp();
                break;
            case 'down':
                moved = this.moveDown();
                break;
            case 'left':
                moved = this.moveLeft();
                break;
            case 'right':
                moved = this.moveRight();
                break;
        }

        if (moved) {
            this.RandomTiles();
        }

        return moved
    }

    moveUp() {
        let check = false;
        for (let colIndex = 0; colIndex < this.Grid[0].length; colIndex++) {
            let curNumInLine = 0;
            for (let rowIndex = 0; rowIndex < this.Grid.length; rowIndex++) {
                if (this.Grid[rowIndex][colIndex].value !== 0) {
                    const curClassName = `tile-position-${colIndex + 1}-${rowIndex + 1}`;
                    const tile = document.querySelector(`.${curClassName}`);

                    if (curNumInLine !== rowIndex) {
                        this.Grid[curNumInLine][colIndex].value = this.Grid[rowIndex][colIndex].value;
                        this.Grid[rowIndex][colIndex].value = 0;
                        check = true

                        tile.classList.remove(curClassName);
                        tile.classList.add(`tile-position-${colIndex + 1}-${curNumInLine + 1}`);
                    }

                    if (curNumInLine > 0 &&
                        this.Grid[curNumInLine - 1][colIndex]?.value === this.Grid[curNumInLine][colIndex]?.value) {

                        const oldValue = this.Grid[curNumInLine - 1][colIndex].value;
                        const newValue = oldValue * 2;
                        this.Grid[curNumInLine - 1][colIndex].value = newValue;
                        this.Grid[curNumInLine][colIndex].value = 0;
                        check = true

                        tile.remove();
                        const doubleCell = document.querySelector(`.tile-position-${colIndex + 1}-${curNumInLine}`);
                        doubleCell.classList.remove(`tile-${oldValue}`);
                        doubleCell.classList.add(`tile-${newValue}`);
                        doubleCell.classList.add(`tile-merged`);
                        setTimeout(() => {
                            doubleCell.classList.remove(`tile-merged`);
                        }, 500);
                        doubleCell.innerHTML = `<div class="tile-inner">${newValue}</div>`;

                        curNumInLine--;
                    }

                    curNumInLine++;
                }
            }
        }
        return check;
    }

    moveDown() {
        let check = false;
        for (let colIndex = 0; colIndex < this.Grid[0].length; colIndex++) {
            let curNumInLine = this.Grid.length - 1;
            for (let rowIndex = this.Grid.length - 1; rowIndex >= 0; rowIndex--) {
                if (this.Grid[rowIndex][colIndex].value !== 0) {
                    const curClassName = `tile-position-${colIndex + 1}-${rowIndex + 1}`;
                    const tile = document.querySelector(`.${curClassName}`);

                    if (curNumInLine !== rowIndex) {
                        this.Grid[curNumInLine][colIndex].value = this.Grid[rowIndex][colIndex].value;
                        this.Grid[rowIndex][colIndex].value = 0;
                        check = true

                        tile.classList.remove(curClassName);
                        tile.classList.add(`tile-position-${colIndex + 1}-${curNumInLine + 1}`);
                    }

                    if (curNumInLine < this.Grid.length - 1 &&
                        this.Grid[curNumInLine + 1][colIndex]?.value === this.Grid[curNumInLine][colIndex]?.value) {

                        const oldValue = this.Grid[curNumInLine + 1][colIndex].value;
                        const newValue = oldValue * 2;
                        this.Grid[curNumInLine + 1][colIndex].value = newValue;
                        this.Grid[curNumInLine][colIndex].value = 0;
                        check = true

                        tile.remove();
                        const doubleCell = document.querySelector(`.tile-position-${colIndex + 1}-${curNumInLine + 2}`);
                        doubleCell.classList.remove(`tile-${oldValue}`);
                        doubleCell.classList.add(`tile-${newValue}`);
                        doubleCell.classList.add(`tile-merged`);
                        setTimeout(() => {
                            doubleCell.classList.remove(`tile-merged`);
                        }, 500);
                        doubleCell.innerHTML = `<div class="tile-inner">${newValue}</div>`;

                        curNumInLine++;
                    }

                    curNumInLine--;
                }
            }
        }
        return check;
    }

    moveLeft() {
        let check = false;

        for (let rowIndex = 0; rowIndex < this.Grid.length; rowIndex++) {
            let curNumInLine = 0;
            for (let colIndex = 0; colIndex < this.Grid[rowIndex].length; colIndex++) {
                if (this.Grid[rowIndex][colIndex].value !== 0) {
                    const curClassName = `tile-position-${colIndex + 1}-${rowIndex + 1}`;
                    const tile = document.querySelector(`.${curClassName}`);

                    if (curNumInLine !== colIndex) {
                        this.Grid[rowIndex][curNumInLine].value = this.Grid[rowIndex][colIndex].value;
                        this.Grid[rowIndex][colIndex].value = 0;
                        check = true

                        tile.classList.remove(curClassName);
                        tile.classList.add(`tile-position-${curNumInLine + 1}-${rowIndex + 1}`);
                    }

                    if (curNumInLine > 0 && this.Grid[rowIndex][curNumInLine - 1]?.value === this.Grid[rowIndex][curNumInLine]?.value) {
                        const oldValue = this.Grid[rowIndex][curNumInLine - 1].value;
                        const newValue = oldValue * 2;

                        this.Grid[rowIndex][curNumInLine - 1].value = newValue;
                        this.Grid[rowIndex][curNumInLine].value = 0;
                        check = true

                        tile.remove();
                        const doubleCell = document.querySelector(`.tile-position-${curNumInLine}-${rowIndex + 1}`);
                        doubleCell.classList.remove(`tile-${oldValue}`);
                        doubleCell.classList.add(`tile-${newValue}`);
                        doubleCell.classList.add(`tile-merged`);
                        setTimeout(() => {
                            doubleCell.classList.remove(`tile-merged`);
                        }, 500);
                        doubleCell.innerHTML = `<div class="tile-inner">${newValue}</div>`;

                        curNumInLine--;
                    }

                    curNumInLine++;
                }
            }
        }

        return check;
    }

    moveRight() {
        let check = false;
        for (let rowIndex = 0; rowIndex < this.Grid.length; rowIndex++) {
            let curNumInLine = this.Grid[rowIndex].length - 1;
            for (let colIndex = this.Grid[rowIndex].length - 1; colIndex >= 0; colIndex--) {
                if (this.Grid[rowIndex][colIndex].value !== 0) {
                    const curClassName = `tile-position-${colIndex + 1}-${rowIndex + 1}`;
                    const tile = document.querySelector(`.${curClassName}`);

                    if (curNumInLine !== colIndex) {
                        this.Grid[rowIndex][curNumInLine].value = this.Grid[rowIndex][colIndex].value;
                        this.Grid[rowIndex][colIndex].value = 0;
                        check = true

                        tile.classList.remove(curClassName);
                        tile.classList.add(`tile-position-${curNumInLine + 1}-${rowIndex + 1}`);
                    }

                    if (curNumInLine < this.Grid[rowIndex].length - 1 &&
                        this.Grid[rowIndex][curNumInLine + 1]?.value === this.Grid[rowIndex][curNumInLine]?.value) {

                        const oldValue = this.Grid[rowIndex][curNumInLine + 1].value;
                        const newValue = oldValue * 2;
                        this.Grid[rowIndex][curNumInLine + 1].value = newValue;
                        this.Grid[rowIndex][curNumInLine].value = 0;
                        check = true

                        tile.remove();
                        const doubleCell = document.querySelector(`.tile-position-${curNumInLine + 2}-${rowIndex + 1}`);
                        doubleCell.classList.remove(`tile-${oldValue}`);
                        doubleCell.classList.add(`tile-${newValue}`);
                        doubleCell.classList.add(`tile-merged`);
                        setTimeout(() => {
                            doubleCell.classList.remove(`tile-merged`);
                        }, 500);
                        doubleCell.innerHTML = `<div class="tile-inner">${newValue}</div>`;

                        curNumInLine++;
                    }

                    curNumInLine--;
                }
            }
        }
        return check;
    }
}

function getRandomEmptyCells(cellNum = 1, cellPositions) {
    let selectedIndexCells = [];
    let selectedCells = [];

    while (selectedIndexCells.length < cellNum) {
        const rand = Math.floor(Math.random() * cellPositions.length);
        if (!selectedIndexCells.includes(rand)) {
            selectedIndexCells = [...selectedIndexCells, rand]
        }
    }

    for (const indexCells of selectedIndexCells) {
        selectedCells = [...selectedCells, cellPositions[indexCells]];
    }

    return selectedCells;
}

function getPositionEmptyCells(grid) {

    let emptyCells = [];

    for(let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        for(let colIndex = 0; colIndex < grid[rowIndex].length; colIndex++) {
            if (grid[rowIndex][colIndex].value === 0) {
                emptyCells = [...emptyCells, {x: colIndex , y: rowIndex }];
            }
        }
    }

    return emptyCells;
}

function getRandomStartNumber() {
    const possibilities = [2, 2, 2, 2, 2, 2, 2, 2, 2, 4];
    const rand = Math.floor(Math.random() * possibilities.length);

    return possibilities[rand];
}

function addCell(position, num) {
    const divEl = document.createElement("div");
    divEl.classList.add('tile', `tile-${num}`, 'tile-new', `tile-position-${position.y + 1}-${position.x+ 1}`);
    divEl.innerHTML = `<div class="tile-inner">${num}</div>`;
    document.querySelector('.tile-container2048').append(divEl);

    setTimeout(() => {
        divEl.classList.remove('tile-new');
    }, 100)
}