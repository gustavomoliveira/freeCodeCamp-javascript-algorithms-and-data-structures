const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.getElementById("current-round");
const rollsElement = document.getElementById("current-round-rolls");
const totalScoreElement = document.getElementById("total-score");
const scoreHistory = document.getElementById("score-history");
const rollDiceBtn = document.getElementById("roll-dice-btn");
const keepScoreBtn = document.getElementById("keep-score-btn");
const rulesContainer = document.querySelector(".rules-container");
const rulesBtn = document.getElementById("rules-btn");

let diceValuesArr = [];
let isModalShowing = false;
let score = 0;
let round = 1; 
let rolls = 0;

const rollDice = () => {
    diceValuesArr = [];
  
    for (let i = 0; i < 5; i++) {
      const randomDice = Math.floor(Math.random() * 6) + 1;
      diceValuesArr.push(randomDice);
    };
  
    listOfAllDice.forEach((dice, index) => {
      dice.textContent = diceValuesArr[index];
    });
  };

rulesBtn.addEventListener("click", () => {
  isModalShowing = !isModalShowing;

  if (isModalShowing) {
    rulesBtn.textContent = "Hide rules";
    rulesContainer.style.display = "block";
  } else {
    rulesBtn.textContent = "Show rules";
    rulesContainer.style.display = "none";
  }
});

keepScoreBtn.addEventListener('click', () => {
  
});

const updateStats = () => {
    if(rolls > 3) {
        round++
        roundElement.textContent = round;
        rolls = 0;
    } else {
        rolls++;
        rollsElement.textContent = rolls;
    }
};

const updateRadioOption = (index, score) => {
  scoreInputs[index].disabled = false;
  scoreInputs[index].value = score;
  scoreSpans[index].innerText = `, score = ${score}`; 
};

const updateScore = (selectedValue, achieved) => {
  score += Number(selectedValue);
  totalScoreElement.textContent = score;
  scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`;
};

const getHighestDuplicates = (arrNum) => {
    let count = {};

    score = arrNum.reduce((a, b) => a + b, 0);

    for(let item of arrNum) {
      count[item] = (count[item] || 0) + 1;
      if(count[item] === 3) {
        updateRadioOption(0, score);
      } else if(count[item] >= 4) {
        updateRadioOption(1, score);
      } else {
        updateRadioOption(5, 0);
      }  
    }
};

const resetRadioOptions = () => {
  scoreInputs.forEach((input) => {
    input.disabled = true;
    input.checked = false;
  });
  console.log(scoreInputs);
  scoreSpans.forEach((span) => {
    span.textContent = '';
  });
};

rollDiceBtn.addEventListener('click', () => {
    if(rolls === 3) {
      alert('You have made three rolls this round. Please select a score.');
      return
    }
    resetRadioOptions()
    rollDice();
    getHighestDuplicates(diceValuesArr);
    updateStats();
});

