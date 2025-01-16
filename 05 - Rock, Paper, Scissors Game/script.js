let playerScore = 0;
let computerScore = 0;

function getRandomComputerResult() {
    const options = ['Rock', 'Paper', 'Scissors'];
    let random = Math.floor(Math.random() * options.length);
    return options[random];
}

function hasPlayerWonTheRound(player, computer) {
    if(player === 'Rock' && computer === 'Scissors') {
        return true;
    } else if(player === 'Scissors' && computer === 'Paper') {
        return true;
    } else if(player === 'Paper' && computer === 'Rock') {
        return true;
    } else {
        return false;
    }
}

function getRoundResults(userOption) {
    const computerResult = getRandomComputerResult();

    if(hasPlayerWonTheRound(userOption, computerResult)) {
        playerScore++;
        return `Player wins! ${userOption} beats ${computerResult}`;
    } else if(userOption === computerResult) {
        return `It's a tie! Both chose ${userOption}`;
    } else {
        computerScore++;
        return `Computer wins! ${computerResult} beats ${userOption}`;
    }
    
}

const playerScoreSpanElement = document.getElementById("player-score");
const computerScoreSpanElement = document.getElementById("computer-score");
const roundResultsMsg = document.getElementById("results-msg");
const winnerMsgElement = document.getElementById("winner-msg");
const optionsContainer = document.querySelector(".options-container");
const resetGameBtn = document.getElementById("reset-game-btn");

function showResults(userOption) {
    roundResultsMsg.innerText = getRoundResults(userOption);
    computerScoreSpanElement.innerText = computerScore;
    playerScoreSpanElement.innerText = playerScore;

    if(playerScore === 3 || computerScore === 3) {
        winnerMsgElement.innerText = `${playerScore === 3 ? 'Player' : 'Computer'} has won the game!`;
        optionsContainer.style.display = "none";
        resetGameBtn.style.display = "block";
    }

}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    computerScoreSpanElement.innerText = computerScore;
    playerScoreSpanElement.innerText = playerScore;
    optionsContainer.style.display = "block";
    resetGameBtn.style.display = "none";
    winnerMsgElement.innerText = '';
    roundResultsMsg.innerHTML = '';
}

resetGameBtn.addEventListener("click", resetGame);

const playerChoice = Array.from(document.querySelectorAll('.btn')).slice(0, 3);

playerChoice.forEach(e => {
    e.addEventListener('click', () => {
        const choice = e.innerText.trim();
        showResults(choice);
    })
});