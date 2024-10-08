//Class du jeu

import {Tiles, ElementTypes} from "./tiles.js"
import {getRandomEmptyCells, getRandomStartNumber, getRandomStartNumberReverse, addCell, getPositionValueCells, Random} from "./utils.js";
import {getBestScore, updateBestScore} from "./main.js";

export class Game {

    constructor(mode = "normal", dimension = 4) {
        this.Mode = mode;
        this.Grid = this.CreateGrill(dimension)
        this.RandomTiles(2)
        this.Score = mode === "reverse" ? 11453246120 : 0;
        this.Win = null;
    }

    CreateGrill(dimension) {
        return [...Array(dimension)].map((_, y) => Array(dimension).fill(null).map((_, x) => new Tiles(x, y)));
    }

    RandomTiles(cellNum = 1) {
        const emptyCells = getPositionValueCells(this.Grid, 0);

        if (emptyCells.length === 0) return;

        const numbers = this.Mode === "reverse" ? [...Array(cellNum)].map(getRandomStartNumberReverse) : [...Array(cellNum)].map(getRandomStartNumber);
        const selectedCells = getRandomEmptyCells(cellNum, emptyCells)

        if (this.checkLoss()) this.Win = false
        if (this.checkWin()) this.Win = true

        selectedCells.forEach((cellPosition, index) => {
            const tile = new Tiles(cellPosition.y, cellPosition.x, true, numbers[index]);

            if (this.Mode === "element") {
                let randElement = Random(Date.now()) * 100;
                if (randElement <= 12) {
                    let randTypes = Math.floor(Random(Date.now()) * 1000) / 25;
                    tile.element = ElementTypes[Math.floor(randTypes)];
                }
            }

            this.Grid[cellPosition.x][cellPosition.y] = tile;
            addCell(cellPosition, numbers[index]);
            if (tile.element) {
                document.querySelector(`.tile-position-${cellPosition.y + 1}-${cellPosition.x + 1}`).classList.add(`${tile.element}-cell`)
                document.querySelector(`.tile-position-${cellPosition.y + 1}-${cellPosition.x + 1}`).classList.remove('tile')
            }
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
                        this.Grid[curNumInLine][colIndex].element = this.Grid[rowIndex][colIndex].element
                        this.Grid[rowIndex][colIndex].value = 0;
                        this.Grid[rowIndex][colIndex].element = null

                        this.Grid[curNumInLine][colIndex].x = colIndex;
                        this.Grid[curNumInLine][colIndex].y = curNumInLine;

                        check = true;

                        tile.classList.remove(curClassName);
                        tile.classList.add(`tile-position-${colIndex + 1}-${curNumInLine + 1}`);
                    }

                    if (curNumInLine > 0 && this.Grid[curNumInLine - 1][colIndex]?.value === this.Grid[curNumInLine][colIndex]?.value) {
                        const doubleCell = document.querySelector(`.tile-position-${colIndex + 1}-${curNumInLine}`);
                        const oldValue = this.Grid[curNumInLine - 1][colIndex].value;
                        const newValue = this.Mode === "reverse" ? oldValue / 2 : oldValue * 2;

                        this.Grid[curNumInLine - 1][colIndex].value = newValue;
                        this.Grid[curNumInLine][colIndex].value = 0;


                        if (this.Grid[curNumInLine - 1][colIndex].element && this.Grid[curNumInLine][colIndex].element) {
                            if (this.Grid[curNumInLine - 1][colIndex].element !== this.Grid[curNumInLine][colIndex].element) {
                                doubleCell.classList.remove(`${this.Grid[curNumInLine - 1][colIndex].element}-cell`);
                                this.Grid[curNumInLine - 1][colIndex].element = null
                                doubleCell.classList.add("tile")
                            }
                        } else {
                            if (this.Grid[curNumInLine - 1][colIndex].element || this.Grid[curNumInLine][colIndex].element) {
                                if (this.Grid[curNumInLine][colIndex].element) {
                                    this.Grid[curNumInLine - 1][colIndex].element = this.Grid[curNumInLine][colIndex].element
                                }
                            }
                        }

                        if (this.Mode === "reverse") this.Score -= newValue;
                        else this.Score += newValue;
                        updateBestScore(this.Mode, this.Score);

                        document.querySelector(".score-container2048").innerHTML = `${this.Score}<div class="score-addition">${(this.Mode === "reverse") ? "-" : "+"}${newValue}</div>`
                        document.querySelector(".best-container2048").innerText = `${getBestScore(this.Mode)}`;

                        check = true;

                        tile.remove();
                        if (this.Grid[curNumInLine - 1][colIndex].element) {
                            document.querySelector(`.tile-position-${colIndex + 1}-${curNumInLine}`).classList.add(`${this.Grid[curNumInLine - 1][colIndex].element}-cell`)
                            document.querySelector(`.tile-position-${colIndex + 1}-${curNumInLine}`).classList.remove('tile')
                        }

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
                        this.Grid[curNumInLine][colIndex].element = this.Grid[rowIndex][colIndex].element
                        this.Grid[rowIndex][colIndex].value = 0;
                        this.Grid[rowIndex][colIndex].element = null

                        this.Grid[curNumInLine][colIndex].x = colIndex;
                        this.Grid[curNumInLine][colIndex].y = curNumInLine;

                        check = true;

                        tile.classList.remove(curClassName);
                        tile.classList.add(`tile-position-${colIndex + 1}-${curNumInLine + 1}`);
                    }

                    if (curNumInLine < this.Grid.length - 1 && this.Grid[curNumInLine + 1][colIndex]?.value === this.Grid[curNumInLine][colIndex]?.value) {
                        const doubleCell = document.querySelector(`.tile-position-${colIndex + 1}-${curNumInLine + 2}`);
                        const oldValue = this.Grid[curNumInLine + 1][colIndex].value;
                        const newValue = this.Mode === "reverse" ? oldValue / 2 : oldValue * 2;

                        this.Grid[curNumInLine + 1][colIndex].value = newValue;
                        this.Grid[curNumInLine][colIndex].value = 0;

                        if (this.Grid[curNumInLine + 1][colIndex].element && this.Grid[curNumInLine][colIndex].element) {
                            if (this.Grid[curNumInLine + 1][colIndex].element !== this.Grid[curNumInLine][colIndex].element) {
                                doubleCell.classList.remove(`${this.Grid[curNumInLine + 1][colIndex].element}-cell`);
                                this.Grid[curNumInLine + 1][colIndex].element = null;
                                doubleCell.classList.add("tile")
                            }
                        } else {
                            if (this.Grid[curNumInLine + 1][colIndex].element || this.Grid[curNumInLine][colIndex].element) {
                                if (this.Grid[curNumInLine][colIndex].element) {
                                    this.Grid[curNumInLine + 1][colIndex].element = this.Grid[curNumInLine][colIndex].element
                                }
                            }
                        }

                        check = true;
                        if (this.Mode === "reverse") this.Score -= newValue;
                        else this.Score += newValue;
                        updateBestScore(this.Mode, this.Score);

                        document.querySelector(".score-container2048").innerHTML = `${this.Score}<div class="score-addition">${(this.Mode === "reverse") ? "-" : "+"}${newValue}</div>`
                        document.querySelector(".best-container2048").innerText = `${getBestScore(this.Mode)}`;


                        tile.remove();
                        if (this.Grid[curNumInLine + 1][colIndex].element) {
                            document.querySelector(`.tile-position-${colIndex + 1}-${curNumInLine + 2}`).classList.add(`${this.Grid[curNumInLine + 1][colIndex].element}-cell`)
                            document.querySelector(`.tile-position-${colIndex + 1}-${curNumInLine + 2}`).classList.remove('tile')
                        }
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
                        this.Grid[rowIndex][curNumInLine].element = this.Grid[rowIndex][colIndex].element
                        this.Grid[rowIndex][colIndex].value = 0;
                        this.Grid[rowIndex][colIndex].element = null;

                        this.Grid[rowIndex][curNumInLine].x = curNumInLine;
                        this.Grid[rowIndex][curNumInLine].y = rowIndex;

                        check = true;

                        tile.classList.remove(curClassName);
                        tile.classList.add(`tile-position-${curNumInLine + 1}-${rowIndex + 1}`);
                    }

                    if (curNumInLine < this.Grid[rowIndex].length - 1 && this.Grid[rowIndex][curNumInLine + 1]?.value === this.Grid[rowIndex][curNumInLine]?.value) {
                        const doubleCell = document.querySelector(`.tile-position-${curNumInLine + 2}-${rowIndex + 1}`);
                        const oldValue = this.Grid[rowIndex][curNumInLine + 1].value;
                        const newValue = this.Mode === "reverse" ? oldValue / 2 : oldValue * 2;

                        this.Grid[rowIndex][curNumInLine + 1].value = newValue;
                        this.Grid[rowIndex][curNumInLine].value = 0;

                        if (this.Grid[rowIndex][curNumInLine + 1].element && this.Grid[rowIndex][curNumInLine].element) {
                            if (this.Grid[rowIndex][curNumInLine + 1].element !== this.Grid[rowIndex][curNumInLine].element) {
                                doubleCell.classList.remove(`${this.Grid[rowIndex][curNumInLine + 1].element}-cell`);
                                doubleCell.classList.add("tile")
                                this.Grid[rowIndex][curNumInLine + 1].element = null;
                            }
                        } else {
                            if (this.Grid[rowIndex][curNumInLine + 1].element || this.Grid[rowIndex][curNumInLine].element) {
                                if (this.Grid[rowIndex][curNumInLine].element) {
                                    this.Grid[rowIndex][curNumInLine + 1].element = this.Grid[rowIndex][curNumInLine].element
                                }
                            }
                        }

                        check = true;
                        if (this.Mode === "reverse") this.Score -= newValue;
                        else this.Score += newValue;
                        updateBestScore(this.Mode, this.Score);

                        document.querySelector(".score-container2048").innerHTML = `${this.Score}<div class="score-addition">${(this.Mode === "reverse") ? "-" : "+"}${newValue}</div>`
                        document.querySelector(".best-container2048").innerText = `${getBestScore(this.Mode)}`;


                        tile.remove();
                        if (this.Grid[rowIndex][curNumInLine + 1].element) {
                            document.querySelector(`.tile-position-${curNumInLine + 2}-${rowIndex + 1}`).classList.add(`${this.Grid[rowIndex][curNumInLine + 1].element}-cell`)
                            document.querySelector(`.tile-position-${curNumInLine + 2}-${rowIndex + 1}`).classList.remove('tile')
                        }
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
                    const doubleCell = document.querySelector(`.tile-position-${curNumInLine}-${rowIndex + 1}`);
                    const curClassName = `tile-position-${this.Grid[rowIndex][colIndex].x + 1}-${this.Grid[rowIndex][colIndex].y + 1}`;
                    const tile = document.querySelector(`.${curClassName}`);

                    if (curNumInLine !== colIndex) {
                        this.Grid[rowIndex][curNumInLine].value = this.Grid[rowIndex][colIndex].value;
                        this.Grid[rowIndex][curNumInLine].element = this.Grid[rowIndex][colIndex].element
                        this.Grid[rowIndex][colIndex].value = 0;
                        this.Grid[rowIndex][colIndex].element = null;

                        this.Grid[rowIndex][curNumInLine].x = curNumInLine;
                        this.Grid[rowIndex][curNumInLine].y = rowIndex;

                        check = true;

                        tile.classList.remove(curClassName);
                        tile.classList.add(`tile-position-${curNumInLine + 1}-${rowIndex + 1}`);
                    }

                    if (curNumInLine > 0 && this.Grid[rowIndex][curNumInLine - 1]?.value === this.Grid[rowIndex][curNumInLine]?.value) {
                        const oldValue = this.Grid[rowIndex][curNumInLine - 1].value;
                        const newValue = this.Mode === "reverse" ? oldValue / 2 : oldValue * 2;

                        this.Grid[rowIndex][curNumInLine - 1].value = newValue;
                        this.Grid[rowIndex][curNumInLine].value = 0;

                        if (this.Grid[rowIndex][curNumInLine - 1].element && this.Grid[rowIndex][curNumInLine].element) {
                            if (this.Grid[rowIndex][curNumInLine - 1].element !== this.Grid[rowIndex][curNumInLine].element) {
                                doubleCell.classList.remove(`${this.Grid[rowIndex][curNumInLine - 1].element}-cell`);
                                this.Grid[rowIndex][curNumInLine - 1].element = null;
                                doubleCell.classList.add("tile")
                            }
                        } else {
                            if (this.Grid[rowIndex][curNumInLine - 1].element || this.Grid[rowIndex][curNumInLine].element) {
                                if (this.Grid[rowIndex][curNumInLine].element) {
                                    this.Grid[rowIndex][curNumInLine - 1].element = this.Grid[rowIndex][curNumInLine].element
                                }
                            }
                        }

                        check = true;
                        if (this.Mode === "reverse") this.Score -= newValue;
                        else this.Score += newValue;
                        updateBestScore(this.Mode, this.Score);


                        document.querySelector(".score-container2048").innerHTML = `${this.Score}<div class="score-addition">${(this.Mode === "reverse") ? "-" : "+"}${newValue}</div>`
                        document.querySelector(".best-container2048").innerText = `${getBestScore(this.Mode)}`;


                        tile.remove();
                        if (this.Grid[rowIndex][curNumInLine - 1].element) {
                            document.querySelector(`.tile-position-${curNumInLine}-${rowIndex + 1}`).classList.add(`${this.Grid[rowIndex][curNumInLine - 1].element}-cell`)
                            document.querySelector(`.tile-position-${curNumInLine}-${rowIndex + 1}`).classList.remove('tile')
                        }
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
                if ((this.Mode !== "reverse" && this.Grid[row][col].value === 2048) || (this.Mode === "reverse" && this.Grid[row][col].value === 256)) {
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