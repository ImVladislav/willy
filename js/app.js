document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.menu a');
    const menuToggler = document.getElementById('menu-toggler');

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Add animation class
                targetSection.classList.add('scroll-animation');
                
                // Scroll to the section
                targetSection.scrollIntoView({ behavior: 'smooth' });

                // Close the menu
                menuToggler.checked = false;

                // Remove the animation class after the animation is done
                setTimeout(() => {
                    targetSection.classList.remove('scroll-animation');
                }, 1000); // Adjust the time to match your animation duration
            }
        });
    });
});

// game

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-button');
let score = 0;
let lastHole;
let timeUp = true;
let timeLeft = 20; // Тривалість гри у секундах
let timerInterval;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(500, 1500); // Час перебування тваринки
    const hole = randomHole(holes);
    const mole = hole.querySelector('.mole');
    mole.classList.add('up');
    setTimeout(() => {
        mole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    score = 0;
    timeLeft = 20; // Відновлення тривалості гри
    timeUp = false;
    scoreBoard.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    peep();
    setTimeout(() => {
        timeUp = true;
        clearInterval(timerInterval);
        timerDisplay.textContent = `Time: 0s`;
    }, timeLeft * 1000);
}

function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
    }
}

function bonk(e) {
    if (!e.isTrusted) return; // Захист від шахрайства
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = `Score: ${score}`;
}

startButton.addEventListener('click', () => {
    startGame();
});

const moles = document.querySelectorAll('.mole');
moles.forEach(mole => mole.addEventListener('click', bonk));