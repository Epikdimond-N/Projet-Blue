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
        this.Win = null;
    }

    CreateGrill(dimension) {
        return [...Array(dimension)].map((_, y) => Array(dimension).fill(null).map((_, x) => new Tiles(x, y)));
    }

    RandomTiles(cellNum = 1) {
        const emptyCells = getPositionEmptyCells(this.Grid);

        if (emptyCells.length === 0) return;

        const numbers = [...Array(cellNum)].map(getRandomStartNumber);
        const selectedCells = getRandomEmptyCells(cellNum, emptyCells)

        if (this.checkLoss()) this.Win = false
        if (this.checkWin()) this.Win = true

        selectedCells.forEach((cellPosition, index) => {
            const tile = new Tiles(cellPosition.y , cellPosition.x, true, numbers[index]);

            if (this.Mode === "element") {
                if (Math.random() <= 0.02) {
                    tile.element = new Elements("fire");
                } else if (Math.random() <= 0.04) {
                    tile.element = new Elements("water");
                } else if (Math.random() <= 0.06) {
                    tile.element = new Elements("earth");
                } else if (Math.random() <= 0.08) {
                    tile.element = new Elements("air");
                }
            }

            this.Grid[cellPosition.x][cellPosition.y] = tile;
            addCell(cellPosition, numbers[index]);
        });
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

        if (this.checkLoss()) this.Win = false;
        if (this.checkWin()) this.Win = true;

        return moved
    }

    moveUp() {
        let check = false;

        for (let colIndex = 0; colIndex < this.Grid[0].length; colIndex++) {
            let curNumInLine = 0;
            for (let rowIndex = 0; rowIndex < this.Grid.length; rowIndex++) {
                if (this.Grid[rowIndex][colIndex].value !== 0) {
                    const curClassName = `tile-position-${this.Grid[rowIndex][colIndex].x + 1}-${this.Grid[rowIndex][colIndex].y + 1}`;
                    const tile = document.querySelector(`.${curClassName}`);

                    if (curNumInLine !== rowIndex) {
                        this.Grid[curNumInLine][colIndex].value = this.Grid[rowIndex][colIndex].value;
                        this.Grid[rowIndex][colIndex].value = 0;

                        this.Grid[curNumInLine][colIndex].x = colIndex;
                        this.Grid[curNumInLine][colIndex].y = curNumInLine;

                        check = true;

                        tile.classList.remove(curClassName);
                        tile.classList.add(`tile-position-${colIndex + 1}-${curNumInLine + 1}`);
                    }

                    if (curNumInLine > 0 && this.Grid[curNumInLine - 1][colIndex]?.value === this.Grid[curNumInLine][colIndex]?.value) {
                        const oldValue = this.Grid[curNumInLine - 1][colIndex].value;
                        const newValue = oldValue * 2;

                        this.Grid[curNumInLine - 1][colIndex].value = newValue;
                        this.Grid[curNumInLine][colIndex].value = 0;

                        check = true;

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
                    const curClassName = `tile-position-${this.Grid[rowIndex][colIndex].x + 1}-${this.Grid[rowIndex][colIndex].y + 1}`;
                    const tile = document.querySelector(`.${curClassName}`);

                    if (curNumInLine !== rowIndex) {
                        this.Grid[curNumInLine][colIndex].value = this.Grid[rowIndex][colIndex].value;
                        this.Grid[rowIndex][colIndex].value = 0;

                        this.Grid[curNumInLine][colIndex].x = colIndex;
                        this.Grid[curNumInLine][colIndex].y = curNumInLine;

                        check = true;

                        tile.classList.remove(curClassName);
                        tile.classList.add(`tile-position-${colIndex + 1}-${curNumInLine + 1}`);
                    }

                    if (curNumInLine < this.Grid.length - 1 &&
                        this.Grid[curNumInLine + 1][colIndex]?.value === this.Grid[curNumInLine][colIndex]?.value) {
                        const oldValue = this.Grid[curNumInLine + 1][colIndex].value;
                        const newValue = oldValue * 2;

                        this.Grid[curNumInLine + 1][colIndex].value = newValue;
                        this.Grid[curNumInLine][colIndex].value = 0;

                        check = true;

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

    moveRight() {
        let check = false;

        for (let rowIndex = 0; rowIndex < this.Grid.length; rowIndex++) {
            let curNumInLine = this.Grid[rowIndex].length - 1;
            for (let colIndex = this.Grid[rowIndex].length - 1; colIndex >= 0; colIndex--) {
                if (this.Grid[rowIndex][colIndex].value !== 0) {
                    const curClassName = `tile-position-${this.Grid[rowIndex][colIndex].x + 1}-${this.Grid[rowIndex][colIndex].y + 1}`;
                    const tile = document.querySelector(`.${curClassName}`);

                    if (curNumInLine !== colIndex) {
                        this.Grid[rowIndex][curNumInLine].value = this.Grid[rowIndex][colIndex].value;
                        this.Grid[rowIndex][colIndex].value = 0;

                        this.Grid[rowIndex][curNumInLine].x = curNumInLine;
                        this.Grid[rowIndex][curNumInLine].y = rowIndex;

                        check = true;

                        tile.classList.remove(curClassName);
                        tile.classList.add(`tile-position-${curNumInLine + 1}-${rowIndex + 1}`);
                    }

                    if (curNumInLine < this.Grid[rowIndex].length - 1 &&
                        this.Grid[rowIndex][curNumInLine + 1]?.value === this.Grid[rowIndex][curNumInLine]?.value) {
                        const oldValue = this.Grid[rowIndex][curNumInLine + 1].value;
                        const newValue = oldValue * 2;

                        this.Grid[rowIndex][curNumInLine + 1].value = newValue;
                        this.Grid[rowIndex][curNumInLine].value = 0;

                        check = true;

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

    moveLeft() {
        let check = false;

        for (let rowIndex = 0; rowIndex < this.Grid.length; rowIndex++) {
            let curNumInLine = 0;
            for (let colIndex = 0; colIndex < this.Grid[rowIndex].length; colIndex++) {
                if (this.Grid[rowIndex][colIndex].value !== 0) {

                    const curClassName = `tile-position-${this.Grid[rowIndex][colIndex].x + 1}-${this.Grid[rowIndex][colIndex].y + 1}`;
                    const tile = document.querySelector(`.${curClassName}`);

                    if (curNumInLine !== colIndex) {
                        this.Grid[rowIndex][curNumInLine].value = this.Grid[rowIndex][colIndex].value;
                        this.Grid[rowIndex][colIndex].value = 0;

                        this.Grid[rowIndex][curNumInLine].x = curNumInLine;
                        this.Grid[rowIndex][curNumInLine].y = rowIndex;

                        check = true;

                        tile.classList.remove(curClassName);
                        tile.classList.add(`tile-position-${curNumInLine + 1}-${rowIndex + 1}`);
                    }

                    if (curNumInLine > 0 && this.Grid[rowIndex][curNumInLine - 1]?.value === this.Grid[rowIndex][curNumInLine]?.value) {
                        const oldValue = this.Grid[rowIndex][curNumInLine - 1].value;
                        const newValue = oldValue * 2;

                        this.Grid[rowIndex][curNumInLine - 1].value = newValue;
                        this.Grid[rowIndex][curNumInLine].value = 0;

                        check = true;

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

    checkWin() {
        for (let row = 0; row < this.Grid.length; row++) {
            for (let col = 0; col < this.Grid[row].length; col++) {
                if (this.Grid[row][col].value === 2048) {
                    return true;
                }
            }
        }
        return false;
    }

    checkLoss() {
        for (let row = 0; row < this.Grid.length; row++) {
            for (let col = 0; col < this.Grid[row].length; col++) {
                if (this.Grid[row][col].value === 0) {
                    return false;
                }
            }
        }

        for (let row = 0; row < this.Grid.length; row++) {
            for (let col = 0; col < this.Grid[row].length; col++) {
                let currentValue = this.Grid[row][col].value;

                if (col < this.Grid[row].length - 1 && this.Grid[row][col + 1].value === currentValue) {
                    return false;
                }

                if (row < this.Grid.length - 1 && this.Grid[row + 1][col].value === currentValue) {
                    return false;
                }

                if (col > 0 && this.Grid[row][col - 1].value === currentValue) {
                    return false;
                }

                if (row > 0 && this.Grid[row - 1][col].value === currentValue) {
                    return false;
                }
            }
        }

        return true;
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
                emptyCells = [...emptyCells, {y: colIndex , x: rowIndex }];
            }
        }
    }

    return emptyCells;
}

function getRandomStartNumber() {
    const possibilities = [2, 2, 2, 2, 2, 2, 2, 2, 2, 4] ;
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