const resultEl = document.getElementById("result");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");

let correctAnswer = 0;
let score = 0;
let timeLeft = 0;
let timer ;

function generateQuestion(){
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operators = ["+","-","*"];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  let question = `${num1} ${operator} ${num2}`;
  questionEl.textContent = question;

  if(operator === '+'){
    correctAnswer = num1 + num2;
  }
  else if(operator === '-'){
    correctAnswer = num1 - num2;
  }
  else{
    correctAnswer = num1 * num2;
  }

  timeLeft = 5;
  timeEl.textContent = timeLeft;
  resultEl.textContent = "";
  answerEl.value = "";
  answerEl.focus();

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if(timeLeft === 0){
      clearInterval(timer);
      resultEl.textContent = `Time's up! Answer was ${correctAnswer}`;
      setTimeout(generateQuestion, 2000)
    }
  },1000)

}


function submitAnswer(){
  const userAnswer = parseInt(answerEl.value);

  if(isNaN(userAnswer))  return;

  clearInterval(timer);
  if(userAnswer === correctAnswer){
    score++;
    resultEl.textContent = `Correct !`;
  }
  else{
    resultEl.textContent = `Wrong ! Correct: ${correctAnswer}`;
  }

  scoreEl.textContent = score;
  setTimeout(generateQuestion, 1500);
}

window.onload = generateQuestion;