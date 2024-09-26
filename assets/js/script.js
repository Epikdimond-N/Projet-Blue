import {Element, restartGame, Chrono, Normal, Reverse, handleKeydown} from "./main.js";

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
    Chrono();
    restartGame();
});

baseGame.addEventListener('click', () => {
    baseGame.style.display = 'none';
    elementGame.style.display = 'block';
    reverse.style.display = 'block';
    chrono.style.display = 'block';
    timer.classList.remove('container-timer');
    timer.classList.add('game-mode');
    title.innerText = '2048';
    Normal();
    restartGame();
    document.addEventListener('keydown', handleKeydown);
});

elementGame.addEventListener('click', () => {
    baseGame.style.display = 'block';
    elementGame.style.display = 'none';
    reverse.style.display = 'block';
    chrono.style.display = 'block';
    timer.classList.remove('container-timer');
    timer.classList.add('game-mode');
    title.innerText = '2048 Element';
    Element();
    restartGame();
    document.addEventListener('keydown', handleKeydown);
});

reverse.addEventListener('click', () => {
    baseGame.style.display = 'block';
    elementGame.style.display = 'block';
    reverse.style.display = 'none';
    chrono.style.display = 'block';
    timer.classList.remove('container-timer');
    timer.classList.add('game-mode');
    title.innerText = '2048 Reverse';
    Reverse();
    restartGame();
    document.addEventListener('keydown', handleKeydown);
});