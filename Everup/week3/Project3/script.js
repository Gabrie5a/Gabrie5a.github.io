let correctAnswer = Math.floor(Math.random() * 100) + 1;
console.log(`CORRECT ANSWER IS ${correctAnswer}`);

document.getElementById("win").style.visibility = "hidden";
document.getElementById("lose").style.visibility = "hidden";

let userAnswer = [];

// USER INPUT LOGIC:
function check(input) {
  if (input.length === 0 || isNaN(input)) {
    document.querySelector(".correction").textContent = "Not a number!";
    return false;
  }
  if (input > 100 || input < 1){
    document.querySelector(".correction").textContent = "Type a number between 1 and 100!";
    return false;
  }
  for (let i = 0; i < userAnswer.length; i++)
    if (userAnswer[i] == input) {
      document.querySelector(".correction").textContent =
        "You have already chosen that number!";
      return false;
    }
  return true;
}

//GAME LOGIC:
let checkAnswer = (correctAnswer, userAnswer) => 
{
  if (userAnswer === correctAnswer) 
  {
    document.querySelector('.correction').textContent = `ANSWER IS CORRECT: ${userAnswer}`;
    return true;
  } 

  else if (
    userAnswer >= correctAnswer - 5 &&
    userAnswer <= correctAnswer + 5 &&
    userAnswer !== correctAnswer
  ) 
  {
    if (userAnswer > correctAnswer)
      document.querySelector('.correction').textContent = `You are close! Go Up!`;
    if (userAnswer < correctAnswer)
      document.querySelector('.correction').textContent = `You are close! Go Down!`;
    return false;
  } else if (
    userAnswer >= correctAnswer - 10 &&
    userAnswer <= correctAnswer + 10 &&
    userAnswer !== correctAnswer
  ) 
  {
    document.querySelector('.correction').textContent = `You are warm!`;
    return false;
  } else if (
    userAnswer > correctAnswer + 10 ||
    (userAnswer < correctAnswer - 10 && userAnswer !== correctAnswer)
  ) 
  {
    if (userAnswer > correctAnswer)
      document.querySelector('.correction').textContent =`You are freezing cold! Go Up!`;
    if (userAnswer < correctAnswer)
      document.querySelector('.correction').textContent = `You are freezzing cold! Go Down!`;
    return false;
  }
};

function addToHistory(input)
{
  let li = document.createElement('li')
  li.innerHTML = input;
  history.appendChild(li);
};

let history = document.querySelector('ul');
let gameTries = 10;
let highScore = 0;

//RETURN TEXT LOGIC:
function returnText() {
  let input = document.getElementById("userInput").value;
  document.getElementById("userInput").value = "";
  if (!check(input)) return 0;
  input = Number(input);
  if(!checkAnswer(input , correctAnswer))
  {
    gameTries--;
    checkAnswer(input , correctAnswer);
    console.log(`# of tries left ${gameTries}`);
    document.querySelector('.score').textContent=`Score: ${gameTries}`;
    addToHistory(input);
    if(gameTries === 0)
  {
    document.getElementById("mainGame").style.visibility = "hidden";
    document.getElementById("gameBar").style.visibility = "hidden";
    document.getElementById("lose").style.visibility = "visible";
    console.log('you lose!');
    document.querySelector('.loseScore').textContent = `Your Score: ${gameTries}`;
    document.querySelector('.loseBest').textContent = `Best Score: ${highScore}`;
  }
  }else{
    highScore = gameTries;
    document.getElementById("win").style.visibility = "visible";
    document.getElementById("gameBar").style.visibility = "hidden";
    document.getElementById("mainGame").style.visibility = "hidden";
    checkAnswer(input , correctAnswer);
    document.querySelector('.highScore').textContent=`Highscore: ${gameTries}`;
    document.querySelector('.winScore').textContent = `Your Score: ${gameTries}`;
    document.querySelector('.winBest').textContent = `Best Score: ${highScore}`;
  }
  console.log(input);
  // document.getElementById("userInput").textContent = `Score: ${input - 1}`;
  userAnswer.push(input);
  console.log(userAnswer);
}

function reset(){
  if (gameTries == 0)
    document.getElementById("lose").style.visibility = "hidden";
  else 
    document.getElementById("win").style.visibility = "hidden";
  document.getElementById("gameBar").style.visibility = "visible";
  document.getElementById("mainGame").style.visibility = "visible";
  document.querySelector('.correction').textContent = `Guess a Number!`;
  document.querySelector('.score').textContent=`Score: 10`;
  correctAnswer= Math.floor(Math.random() * 100) + 1;
  console.log(`correct answer:`, correctAnswer);
  history.innerHTML = "";
  gameTries = 10;
  userAnswer =[];
}