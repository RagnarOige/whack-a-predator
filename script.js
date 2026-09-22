const gameBoard = document.getElementById("game-board");
const difficultyElement = document.getElementById("difficulty");
const startButton = document.getElementById("start-button");

let score = 0;
let timeLeft = 30;
let gameTimer;
let moleTimer;
let gameRunning = false;


const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const messageElement = document.getElementById("message");

const difficulties = {
    easy: 7000,
    hard: 1500,
    impossible: 300
};

const moleImages = [
    "images/J.e.epstein.png",
    "images/diddy.png",
    "images/netanyahu.png",
    "images/trump.png"
];

const holes = [];

for (let i = 0; i < 9; i++) {
    const hole = document.createElement("div");

    hole.classList.add("hole");

    gameBoard.appendChild(hole);

    holes.push(hole);
}

const mole = document.createElement("img");

mole.classList.add("mole");

mole.alt = "Mole";

function moveMole() {
    if (!gameRunning) {
        return;
    }

    const randomIndex = Math.floor(Math.random() * holes.length);

    const randomImage = Math.floor(Math.random() * moleImages.length);

    mole.src = moleImages[randomImage];

    holes[randomIndex].appendChild(mole);

    const moleSpeed = difficulties[difficultyElement.value];

    moleTimer = setTimeout(() => {
        mole.remove();

        moveMole();
    }, moleSpeed);
}


mole.addEventListener("click", whackMole);

function whackMole() {
    score++;

    scoreElement.textContent = score;

    moveMole();
}

function startGame() {
    if (gameRunning) {
        return;
    }

    gameRunning = true;

    startButton.textContent = "Game Running...";
    startButton.disabled = true;

    score = 0;
    timeLeft = 30;

    scoreElement.textContent = score;
    timeElement.textContent = timeLeft;
    messageElement.textContent = "";

    moveMole();

    gameTimer = setInterval(() => {
        timeLeft--;

        timeElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(gameTimer);
    clearInterval(moleTimer);

    gameRunning = false;

    startButton.textContent = "Start Game";
    startButton.disabled = false;   

    messageElement.textContent = `Game over! Diddy escaped :( Your score: ${score}`;
}

startButton.addEventListener("click", startGame);