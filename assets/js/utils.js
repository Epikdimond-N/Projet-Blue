/**
 * Récupérer des tiles vides aléatoires
 * @param cellNum Nombre de tiles vides à récupérer
 * @param cellPositions Liste des positions des tiles vides
 * @returns {*[]} Liste des positions de la tile vide sélectionnée
 */
function getRandomEmptyCells(cellNum = 1, cellPositions) {
    let selectedIndexCells = [];
    let selectedCells = [];

    while (selectedIndexCells.length < cellNum) {
        const rand = Math.floor(Random(Date.now()) * cellPositions.length);
        if (!selectedIndexCells.includes(rand)) {
            selectedIndexCells = [...selectedIndexCells, rand]
        }
    }

    for (const indexCells of selectedIndexCells) {
        selectedCells = [...selectedCells, cellPositions[indexCells]];
    }

    return selectedCells;
}

/**
 * Récupérer les positions des tiles ayant une valeur donnée
 * @param grid Grille de jeu
 * @param value Valeur de la tile
 * @returns {*[]} Liste des positions des tiles ayant la valeur donnée
 */
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

/**
 * Récupérer un nombre de départ aléatoire
 * @returns {number} Nombre de départ aléatoire
 */
function getRandomStartNumber() {
    const possibilities = [2, 2, 2, 2, 2, 2, 2, 2, 2, 4];
    const rand = Math.floor(Random(Date.now()) * possibilities.length);

    return possibilities[rand];
}

/**
 * Récupérer un nombre de départ aléatoire (inverse)
 * @returns {number} Nombre de départ aléatoire
 */
function getRandomStartNumberReverse() {
    const possibilities = [131072, 131072, 131072, 131072, 131072, 131072, 131072, 131072, 131072, 65536];
    const rand = Math.floor(Math.random() * possibilities.length);

    return possibilities[rand];
}

/**
 * Ajouter une cellule sur la grille du front
 * @param position Position de la cellule
 * @param num Numéro de la cellule
 */
function addCell(position, num) {
    const divEl = document.createElement("div");
    divEl.classList.add('tile', `tile-${num}`, 'tile-new', `tile-position-${position.y + 1}-${position.x + 1}`);
    divEl.innerHTML = `<div class="tile-inner">${num}</div>`;
    document.querySelector('.tile-container2048').append(divEl);

    setTimeout(() => {
        divEl.classList.remove('tile-new');
    }, 100)
}

/**
 * Fonction pour générer un nombre aléatoire
 * @param seed Date.now()
 * @returns {number} Nombre aléatoire
 */
function Random(seed) {
    const a = 1664525;   // multiplicateur
    const c = 1013904223; // incrément
    const m = 2 ** 32;    // modulus

    seed = (a * seed + c) % m;
    return seed / m; // Retourne un nombre entre 0 et 1
}

export {getRandomEmptyCells, getPositionValueCells, getRandomStartNumber, getRandomStartNumberReverse, addCell, Random};