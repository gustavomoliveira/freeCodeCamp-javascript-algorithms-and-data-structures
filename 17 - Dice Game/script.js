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

const updateStats = () => {
    rollsElement.textContent = rolls;
    roundElement.textContent = round;
};

const updateRadioOption = (index, score) => {
    scoreInputs[index].disabled = false;
    scoreInputs[index].value = score;
    scoreSpans[index].innerText = `, score = ${score}`; 
};

const updateScore = (selectedValue, achieved) => {
  score += parseInt(selectedValue);
  totalScoreElement.textContent = score;
  scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`;
};

const getHighestDuplicates = (arrNum) => {
  let count = {};
  let highestCount = 0;

  const score = arrNum.reduce((a, b) => a + b, 0);

  for (let item of arrNum) {
    count[item] = (count[item] || 0) + 1;
    highestCount = Math.max(highestCount, count[item]);
  }

  if (highestCount >= 4) {
    updateRadioOption(1, score);
  }

  if (highestCount >= 3) {
    updateRadioOption(0, score);
  }

  updateRadioOption(5, 0);
};

console.log(scoreInputs[3]);

const detectFullHouse = (diceValuesArr) => {
  let count = {};
  let threeOfKind = null;
  let pair = null;

  for(let item of diceValuesArr) {
    count[item] = (count[item] || 0) + 1;
  }

  for(let num in count) {
    if(count[num] === 3) {
      threeOfKind = parseInt(num);
    } else if(count[num] === 2) {
      pair = parseInt(num);
    }
  }

  if(threeOfKind && pair) {
    updateRadioOption(2, 25);
  } else {
    updateRadioOption(5, 0);
  }
};

const checkForStraights = (diceValuesArr) => {
  let sorted = diceValuesArr.sort((a, b) => a - b);

  if(sorted[1] === sorted[0] + 1 && sorted[2] === sorted[1] + 1 && sorted[3] === sorted[2] + 1) {
    updateRadioOption(3, 30);
  }
  
  if(sorted[1] === sorted[0] + 1 && sorted[2] === sorted[1] + 1 && sorted[3] === sorted[2] + 1 && sorted[4] === sorted[3] + 1 ) {
    updateRadioOption(4, 40);
  } 
  
  updateRadioOption(5, 0);
};

const resetRadioOptions = () => {
  scoreInputs.forEach((input) => {
    input.disabled = true;
    input.checked = false;
  });
  scoreSpans.forEach((span) => {
    span.textContent = '';
  });
};

const resetGame = () => {
  listOfAllDice.forEach((dice) => {
    dice.textContent = 0;
  });
  score = 0;
  rolls = 0;
  round = 1;
  totalScoreElement.textContent = score;
  scoreHistory.innerHTML = '';
  rollsElement.textContent = rolls;
  roundElement.textContent = round;
  resetRadioOptions();
};

rollDiceBtn.addEventListener('click', () => {
  if(rolls === 3) {
    alert('You have made three rolls this round. Please select a score.');
    return
  }
  rolls++;
  resetRadioOptions()
  rollDice();
  getHighestDuplicates(diceValuesArr);
  updateStats();
  detectFullHouse(diceValuesArr);
  checkForStraights(diceValuesArr);
});

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
  let selectedValue;
  let idInput;

  scoreInputs.forEach((input) => {
    if(input.checked) {
      selectedValue = input.value;
      idInput = input.id;
      rolls = 0;
      round++;
      resetRadioOptions();
      updateStats();
      updateScore(selectedValue, idInput);
      if(round > 6) {
        setTimeout(() => (alert(`Game Over! Your total score is ${score}.`), resetGame()), 500);
      }
    }
  });

  if(!selectedValue) {
    alert('Select an option to continue.');
  }
});



