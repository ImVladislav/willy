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
const bestScoreDisplay = document.getElementById('best-score');
const hammer = document.getElementById('hammer');
const gameContainer = document.getElementById('game');
let score = 0;
let lastHole;
let timeUp = true;
let timeLeft = 20; // Тривалість гри у секундах
let timerInterval;
let bestScore = localStorage.getItem('bestScore') || 0;

// Відображення найкращого результату
bestScoreDisplay.textContent = `Best Score: ${bestScore}`;

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

    // Деактивуємо кнопку старту
    startButton.disabled = true;

    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    peep();

    setTimeout(() => {
        timeUp = true;
        clearInterval(timerInterval);
        timerDisplay.textContent = `Time: 0s`;

        // Активуємо кнопку старту
        startButton.disabled = false;

        // Оновлення найкращого результату
        if (score > bestScore) {
            bestScore = score;
            localStorage.setItem('bestScore', bestScore);
            bestScoreDisplay.textContent = `Best Score: ${bestScore}`;
        }
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

// Переміщення молотка
function moveHammer(e) {
    hammer.style.display = 'block';
    hammer.style.left = `${e.pageX - hammer.offsetWidth / 2}px`;
    hammer.style.top = `${e.pageY - hammer.offsetHeight / 2}px`;
}

// Удар молотком
function hitHammer() {
    hammer.classList.add('active');
    setTimeout(() => hammer.classList.remove('active'), 100);
}

// Події
startButton.addEventListener('click', startGame);
const moles = document.querySelectorAll('.mole');
moles.forEach(mole => mole.addEventListener('click', bonk));
gameContainer.addEventListener('mousemove', moveHammer);
gameContainer.addEventListener('mousedown', hitHammer);

//копі текст

document.getElementById('text-to-copy').addEventListener('click', function () {
    // Отримуємо текст з елемента
    const text = this.textContent;

    // Копіюємо текст до буфера обміну
    navigator.clipboard.writeText(text)
        .then(() => {
            alert(`Copied: "${text}"`);
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
});


// фак мор


const counterButton = document.getElementById("counter-button");
const dynamicGif = document.getElementById("dynamic-gif");

const gifs = [
    "gif/0.png",
    "gif/1.gif",
    "gif/2.gif",
    "gif/3.gif",
    "gif/4.gif",
];
let counter = 0;

// Функція для оновлення тексту кнопки
function updateCounterButtonText(counter) {
    switch (counter) {
        case 1:
            return "Fuck Jeets";
        case 2:
            return "Fuck Jeets !";
        case 3:
            return "Fuck Jeets !!";
        case 4:
            return "Fuck Jeets !!!";
        default:
            return "Fuck";
    }
}

// Обробник кліку для зміни GIF і тексту кнопки
counterButton.addEventListener("click", () => {
    counter = (counter + 1) % gifs.length; // Зміна індексу GIF
    dynamicGif.src = gifs[counter]; // Зміна GIF або PNG
    counterButton.textContent = updateCounterButtonText(counter); // Оновлення тексту кнопки
});

// Початкове встановлення тексту кнопки та GIF
counterButton.textContent = updateCounterButtonText(counter);
dynamicGif.src = gifs[counter];