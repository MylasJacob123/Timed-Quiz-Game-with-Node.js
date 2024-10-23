const readlineSync = require("readline-sync");

const quizQuestions = [
  { question: "Where is the strongest human muscle located?", answer: "Jaw" },
  {
    question: "Which is the only body part that is fully grown from birth?",
    answer: "Eyes",
  },
  {
    question: "Which is the only continent with land in all four hemispheres?",
    answer: "Africa",
  },
  {
    question: "On which continent would you find the world's largest desert?",
    answer: "Antarctica",
  },
  {
    question: "Which planet in the Milky Way is the hottest?",
    answer: "Venus",
  },
  {
    question: "What is a group of Pandas known as?",
    answer: "An embarrassment",
  }
];

let score = 0;
let currentQuestion = 0;
const questionTimeLimit = 10;
const totalQuizTime = 60;
let totalTimeLeft = totalQuizTime;

function askQuestion() {
  if (currentQuestion < quizQuestions.length && totalTimeLeft > 0) {
    let timeLeft = questionTimeLimit;
    const questionObj = quizQuestions[currentQuestion];

    console.log(`\nQuestion ${currentQuestion + 1}: ${questionObj.question}`);
    console.log(`You have ${timeLeft} seconds to answer...`);

    const questionInterval = setInterval(() => {
      timeLeft--;
      totalTimeLeft--;
      if (timeLeft > 0 && totalTimeLeft > 0) {
        console.log(`Time remaining for this question: ${timeLeft} seconds`);
      } else if (timeLeft === 0 || totalTimeLeft === 0) {
        clearInterval(questionInterval);
        console.log(
          `Time's up for this question! Moving to the next question.`
        );
        currentQuestion++;
        askQuestion();
      }
    }, 1000);

    const userAnswer = readlineSync.question("\nEnter your answer: ");

    clearInterval(questionInterval); 
    if (userAnswer.toLowerCase() === questionObj.answer.toLowerCase()) {
      score++;
      console.log("Correct!");
    } else {
      console.log(`Wrong! The correct answer was: ${questionObj.answer}`);
    }

    currentQuestion++;
    if (currentQuestion < quizQuestions.length && totalTimeLeft > 0) {
      askQuestion(); 
    } else {
      endQuiz(); 
    }
  }
}

function endQuiz() {
  console.log("\nThe quiz has ended!");
  console.log(`Final score: ${score}/${quizQuestions.length}`);
  process.exit();
}

const totalQuizTimer = setInterval(() => {
  if (totalTimeLeft <= 0) {
    clearInterval(totalQuizTimer);
    console.log("\nTime's up! The quiz has ended.");
    endQuiz(); 
  }
}, 1000);

console.log("Welcome to the Quiz!\n");
askQuestion();
