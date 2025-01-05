// Variables for the game
let score = 0;
let timeLeft = 10;
let gameInterval;
let countdownInterval;

// Elements
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timeLeft');
const gameButton = document.getElementById('gameButton');
const gameOverMessage = document.getElementById('gameOverMessage');
const finalScore = document.getElementById('finalScore');

// Start the game when the button is clicked
gameButton.addEventListener('click', () => {
    if (timeLeft === 10) {
        startGame(); // Start the countdown when the first click happens
    }
    // Increase score with each button click
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
});

// Start the game with countdown timer
function startGame() {
    gameInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
        } else {
            endGame();
        }
    }, 1000);
}

// End the game and show final score
function endGame() {
    clearInterval(gameInterval);
    gameOverMessage.style.display = 'block';
    finalScore.textContent = score;
    gameButton.disabled = true; // Disable the button once the game is over
}

