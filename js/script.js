function getComputerChoice() {
    return handOptions[Math.floor(Math.random() * handOptions.length)];
}

function checkWinnerRound(computerOption, userOption) {
    let gameStatus = document.querySelector(".game-status");

    // Computer wins
    if (computerOption === "paper" && userOption === "rock" ||
        computerOption === "rock" && userOption === "scissors" ||
        computerOption === "scissors" && userOption === "paper") {
        computerScore++;
        gameStatus.textContent = `You Lose! ${computerOption} beats ${userOption}`;
    } // User wins
    else if (userOption === "paper" && computerOption === "rock" ||
        userOption === "rock" && computerOption === "scissors" ||
        userOption === "scissors" && computerOption === "paper") {
        userScore++;
        gameStatus.textContent = `You Win! ${userOption} beats ${computerOption}`;
    } // Tie
    else {
        gameStatus.textContent = `Tie! ${computerOption} ties ${userOption}`;
    }
}

function hideGameElements() {
    let sectionGame = document.querySelector(".section-game");
    sectionGame.classList.add("hidden");

    // Reset score variables
    userScore = 0;
    computerScore = 0;

    // Reset game status text
    let gameStatus = document.querySelector(".game-status");
    gameStatus.textContent = "PICK YOUR OPTION";

    // Reset score text
    let score = document.querySelector(".score");
    score.textContent = "0:0";

    // Reset hands
    let playerHand = document.querySelector(".player-hand");
    let computerHand = document.querySelector(".computer-hand");

    playerHand.textContent = "?";
    computerHand.textContent = "?";
}

function loadWelcomeElements() {
    let sectionIntro = document.querySelector(".section-intro");
    sectionIntro.classList.remove("hidden");
}

function stopGame(winner) {
    gameOngoing = false;

    // Reset and hide current layout
    hideGameElements();

    // Load the DOM elements
    loadWelcomeElements();

    // Update the welcome text to the winners text
    let welcomeText = document.querySelector(".welcome-text");
    if (winner === "user") {
        welcomeText.textContent = "You've just won the game! Dare to play again?";
    } else if (winner === "computer") {
        welcomeText.textContent = "Dang, that computer got us. Let's get him next."
    } else {
        welcomeText.textContent = "Let's play some Rock Papers Scissors";
        console.warn("Something went wrong in stopGame function.");
    }
}

function checkWinnerGame() {
    if (userScore === 5) {
        stopGame("user");
    } else if (computerScore === 5) {
        stopGame("computer");
    }
}

function updateScore() {
    let score = document.querySelector(".score");
    score.textContent = `${userScore}:${computerScore}`;
}

function updateHand(computerChoice, userChoice) {
    let playerHand = document.querySelector(".player-hand");
    let computerHand = document.querySelector(".computer-hand");

    playerHand.textContent = "";
    computerHand.textContent = "";

    let playerHandImage = document.createElement("img");
    let computerHandImage = document.createElement("img");
    playerHandImage.setAttribute("src", `images/hand-${userChoice}.png`);
    playerHandImage.setAttribute("draggable", "false");
    playerHandImage.classList.add("hand-image");

    computerHandImage.setAttribute("src", `images/hand-${computerChoice}.png`);
    computerHandImage.setAttribute("draggable", "false");
    computerHandImage.classList.add("hand-image")

    // Append the image elements to their respective containers
    playerHand.appendChild(playerHandImage);
    computerHand.appendChild(computerHandImage);
}

function playRound(e) {
    let computerChoice = getComputerChoice();
    let userChoice = e.target.getAttribute("data-hand");
    userChoice = handOptions.includes(userChoice) ? userChoice : undefined;

    // The users option is not valid
    if (!userChoice) {
        alert("The option provided is invalid, please try again!");
    } else {
        // Check if any one of them won the round
        checkWinnerRound(computerChoice, userChoice);

        // Update score
        updateScore();

        // Update players hands
        updateHand(computerChoice, userChoice);

        // Check if any one of them won the game
        checkWinnerGame();
    }
}

function hideWelcomeElements() {
    let sectionIntro = document.querySelector(".section-intro");
    sectionIntro.classList.add("hidden");
}

function loadGameElements() {
    let sectionGame = document.querySelector(".section-game");
    sectionGame.classList.remove("hidden");
}

function game() {
    gameOngoing = true;

    // Hide current play button and welcome text
    hideWelcomeElements();

    // Load the DOM elements
    loadGameElements();
}

// Constants and global variables
const handOptions = ["rock", "paper", "scissors"];
let gameOngoing = false;
let userScore = 0;
let computerScore = 0;

// Event listeners
let playButton = document.querySelector(".play-button");
playButton.addEventListener("click", game);

let userOptions = document.querySelectorAll(".container-options > div");
userOptions.forEach(item => item.addEventListener("click", playRound));
