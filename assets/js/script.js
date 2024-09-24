// Fonction pour désélectionner toutes les cellules d'autres types
function deselectOtherCells() {
    // Retirer les sélections des cellules Wind
    document.querySelectorAll('.wind-cell').forEach((c) => c.classList.remove('wind-cell-selected'));

    // Retirer les sélections des cellules Water
    document.querySelectorAll('.water-cell').forEach((c) => c.classList.remove('water-cell-selected'));

    // Retirer les sélections des cellules Flame
    document.querySelectorAll('.flame-cell').forEach((c) => c.classList.remove('flame-cell-selected'));
}

// Script pour sélectionner une cell de type Wind
const elWind = document.querySelectorAll('.wind-cell');
elWind.forEach((cell) => {
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
