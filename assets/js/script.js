// Fonction pour désélectionner toutes les cellules d'autres types
function deselectOtherCells() {
    console.log("caca");
    // Retirer les sélections des cellules Wind
    document.querySelectorAll('.wind-cell').forEach((c) => c.classList.remove('wind-cell-selected'));

    // Retirer les sélections des cellules Water
    document.querySelectorAll('.water-cell').forEach((c) => c.classList.remove('water-cell-selected'));

    // Retirer les sélections des cellules Flame
    document.querySelectorAll('.flame-cell').forEach((c) => c.classList.remove('flame-cell-selected'));

    // Retirer les sélections des cellules Earth
    document.querySelectorAll('.earth-cell').forEach((c) => c.classList.remove('flame-cell-selected'));
}

// Script pour sélectionner une cell de type Wind
const elWind = document.querySelectorAll('.wind-cell');
elWind.forEach((cell) => {
    console.log("caca");
    cell.addEventListener('click', () => {
        if (cell.classList.contains('wind-cell-selected')) {
            // Si déjà sélectionnée, désélectionner sans affecter les autres
            cell.classList.remove('wind-cell-selected');
        } else {
            deselectOtherCells(); // Désélectionner les autres types
            elWind.forEach((c) => c.classList.remove('wind-cell-selected')); // Désélectionner toutes les cellules Wind
            cell.classList.add('wind-cell-selected'); // Sélectionner la cellule cliquée
        }
    });
});

// Script pour sélectionner une cell de type Water
const elWater = document.querySelectorAll('.water-cell');
elWater.forEach((cell) => {
    console.log("caca");
    cell.addEventListener('click', () => {
        if (cell.classList.contains('water-cell-selected')) {
            // Si déjà sélectionnée, désélectionner sans affecter les autres
            cell.classList.remove('water-cell-selected');
        } else {
            deselectOtherCells(); // Désélectionner les autres types
            elWater.forEach((c) => c.classList.remove('water-cell-selected')); // Désélectionner toutes les cellules Water
            cell.classList.add('water-cell-selected'); // Sélectionner la cellule cliquée
        }
    });
});

// Script pour sélectionner une cell de type Flame
const elFlame = document.querySelectorAll('.flame-cell');
elFlame.forEach((cell) => {
    console.log("caca");
    cell.addEventListener('click', () => {
        if (cell.classList.contains('flame-cell-selected')) {
            // Si déjà sélectionnée, désélectionner sans affecter les autres
            cell.classList.remove('flame-cell-selected');
        } else {
            deselectOtherCells(); // Désélectionner les autres types
            elFlame.forEach((c) => c.classList.remove('flame-cell-selected')); // Désélectionner toutes les cellules Flame
            cell.classList.add('flame-cell-selected'); // Sélectionner la cellule cliquée
        }
    });
});

// Script pour sélectionner une cell de type Earth
const elEarth = document.querySelectorAll('.earth-cell');
elEarth.forEach((cell) => {
    console.log("caca");
    cell.addEventListener('click', () => {
        if (cell.classList.contains('earth-cell-selected')) {
            // Si déjà sélectionnée, désélectionner sans affecter les autres
            cell.classList.remove('earth-cell-selected');
        } else {
            deselectOtherCells(); // Désélectionner les autres types
            elFlame.forEach((c) => c.classList.remove('earth-cell-selected')); // Désélectionner toutes les cellules Flame
            cell.classList.add('earth-cell-selected'); // Sélectionner la cellule cliquée
        }
    });
});

const chrono = document.getElementById('2048-chrono');
const baseGame = document.getElementById('2048');
const elementGame = document.getElementById('2048-element');
const reverse = document.getElementById('2048-reverse');

const title = document.getElementById('title');
const timer = document.getElementById('timer');

chrono.addEventListener('click', () => {
    baseGame.style.display = 'block';
    elementGame.style.display = 'block';
    reverse.style.display = 'block';
    timer.classList.remove('game-mode');
    timer.classList.add('container-timer');
    chrono.style.display = 'none';
    title.innerText = '2048 Chrono';
});

baseGame.addEventListener('click', () => {
    baseGame.style.display = 'none';
    elementGame.style.display = 'block';
    reverse.style.display = 'block';
    chrono.style.display = 'block';
    timer.classList.remove('container-timer');
    timer.classList.add('game-mode');
    title.innerText = '2048';
});

elementGame.addEventListener('click', () => {
    baseGame.style.display = 'block';
    elementGame.style.display = 'none';
    reverse.style.display = 'block';
    chrono.style.display = 'block';
    timer.classList.remove('container-timer');
    timer.classList.add('game-mode');
    title.innerText = '2048 Element';
});

reverse.addEventListener('click', () => {
    baseGame.style.display = 'block';
    elementGame.style.display = 'block';
    reverse.style.display = 'none';
    chrono.style.display = 'block';
    timer.classList.remove('container-timer');
    timer.classList.add('game-mode');
    title.innerText = '2048 Reverse';
});