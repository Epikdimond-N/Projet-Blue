import { handleKeydown } from "./main.js";

let timer; // Pour maintenir l'ID du minuteur
let totalTime; // Temps total en secondes
let remainingTime; // Temps restant en secondes
let isTimerStarted = false; // Indicateur pour vérifier si le timer a commencé

function startTimer(minutes) {
    // Définir le temps total et le temps restant
    totalTime = minutes * 60;
    remainingTime = totalTime;
    document.addEventListener('keydown', handleKeydown);


    // Cacher les boutons de démarrage et afficher le bouton de réinitialisation
    document.querySelectorAll('button:not(#reset)').forEach(button => button.style.visibility = 'hidden');
    document.querySelectorAll('.p-container-timer').forEach(button => button.style.visibility = 'hidden');

    // Afficher le timer initial
    updateDisplay();
}

function updateDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

// Fonction pour démarrer le timer au premier mouvement
function commenceTimer() {
    if (!isTimerStarted) {
        isTimerStarted = true;
        timer = setInterval(() => {
            remainingTime--;
            updateDisplay();

            // Changer la couleur du cercle à rouge si le temps restant est inférieur ou égal à 30 secondes
            if (remainingTime <= 30) {
                document.querySelector('.circle').style.borderColor = 'var(--color-secondary2)';
                document.querySelector('.time').style.color = 'var(--color-secondary2)';
            }

            // Arrêter le timer quand le temps est écoulé
            if (remainingTime <= 0) {
                clearInterval(timer);

                // Désactiver l'écoute des événements de clavier (arrêt du jeu)
                document.removeEventListener('keydown', handleKeydown);

                // Afficher le message de fin de jeu
                document.querySelector('.game-message').classList.add('game-over');
                document.querySelector('.game-message').querySelector('p').innerText = 'Jeu terminé !';
            }
        }, 1000);
    }
}

// Fonction pour réinitialiser le timer
function resetTimer() {
    clearInterval(timer);
    document.addEventListener('keydown', handleKeydown);
    remainingTime = 0;
    updateDisplay();
    document.querySelectorAll('button:not(#reset)').forEach(button => button.style.visibility = 'visible');
    document.querySelectorAll('.p-container-timer').forEach(button => button.style.visibility = 'visible');

    // Réinitialiser la couleur du cercle
    document.querySelector('.circle').style.borderColor = 'var(--color-secondary)';
    document.querySelector('.time').style.color = '#3c3a32';
    isTimerStarted = false;
}

// Exporter les fonctions
export { startTimer, commenceTimer, resetTimer };
