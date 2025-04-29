const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionEl = document.getElementById('question');
const answerButtonsEl = document.getElementById('answer-buttons');

let currentQuestionIndex = 0;
let questions = [
  {
    question: "What is the capital of India?",
    answers: [
      { text: "New Delhi", correct: true },
      { text: "Mumbai", correct: false },
      { text: "Chennai", correct: false },
      { text: "Kolkata", correct: false }
    ]
  },
  {
    question: "Which country is known as the Land of the Thunder Dragon?",
    answers: [
      { text: "Nepal", correct: false },
      { text: "Sri Lanka", correct: false },
      { text: "Bhutan", correct: true },
      { text: "Bangladesh", correct: false }
    ]
  }
];

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startQuiz() {
  startButton.classList.add('hide');
  currentQuestionIndex = 0;
  questionContainer.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionEl.innerText = question.question;
  question.answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.innerText = answer.text;
    btn.classList.add('btn');
    if (answer.correct) btn.dataset.correct = true;
    btn.addEventListener('click', selectAnswer);
    answerButtonsEl.appendChild(btn);
  });
}

function resetState() {
  nextButton.classList.add('hide');
  answerButtonsEl.innerHTML = '';
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct === "true";
  Array.from(answerButtonsEl.children).forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.correct === "true") {
      btn.style.background = "#28a745";
    } else {
      btn.style.background = "#dc3545";
    }
  });
  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = "Restart Quiz";
    startButton.classList.remove('hide');
  }
}
