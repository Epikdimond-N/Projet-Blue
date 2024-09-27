
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

function getPositionValueCells(grid, value) {

    let emptyCells = [];

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        for (let colIndex = 0; colIndex < grid[rowIndex].length; colIndex++) {
            if (grid[rowIndex][colIndex].value === value) {
                emptyCells = [...emptyCells, {y: colIndex, x: rowIndex}];
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

function getRandomStartNumberReverse() {
    const possibilities = [131072, 131072, 131072, 131072, 131072, 131072, 131072, 131072, 131072, 65536];
    const rand = Math.floor(Math.random() * possibilities.length);

    return possibilities[rand];
}

function addCell(position, num) {
    const divEl = document.createElement("div");
    divEl.classList.add('tile', `tile-${num}`, 'tile-new', `tile-position-${position.y + 1}-${position.x + 1}`);
    divEl.innerHTML = `<div class="tile-inner">${num}</div>`;
    document.querySelector('.tile-container2048').append(divEl);

    setTimeout(() => {
        divEl.classList.remove('tile-new');
    }, 100)
}

export {getRandomEmptyCells, getPositionValueCells, getRandomStartNumber, getRandomStartNumberReverse, addCell};