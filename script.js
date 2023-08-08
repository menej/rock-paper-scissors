const handOptions = ["rock","paper","scissors"];

function getComputerChoice() {
    return handOptions[Math.floor(Math.random() * handOptions.length)];
}

function getUserChoice() {
    let userChoice = prompt("What will you play (rock, paper, scissors)?");
    // If value is not null
    userChoice = userChoice && userChoice.toLowerCase().trim();
    return handOptions.includes(userChoice) ? userChoice : undefined;
}

function checkWinner(computerOption,userOption) {
    // Computer wins
    if (computerOption === "paper" && userOption === "rock" ||
        computerOption === "rock" && userOption === "scissors" ||
        computerOption === "scissors" && userOption === "paper") {
        return `You Lose! ${computerOption} beats ${userOption}`;
    } // User wins
    else if (userOption === "paper" && computerOption === "rock" ||
        userOption === "rock" && computerOption === "scissors" ||
        userOption === "scissors" && computerOption === "paper") {
        return `You Win! ${userOption} beats ${computerOption}`;
    } // Tie
    else {
        return `Tie! ${computerOption} ties ${userOption}`;
    }
}

function playRound() {
    let computerOption = getComputerChoice();
    let userOption = getUserChoice();

    // The users option is not valid
    if (!userOption) {
        alert("The option provided is invalid, please try again!");
        playRound();
    } else {
        alert(checkWinner(computerOption,userOption));
    }
}

function game() {
    for (let i = 0; i < 5; i++) {
        playRound();
    }
}

document.addEventListener("DOMContentLoaded",game);