// script.js
const questions = [
  {
    question: "¿Cuál es el sinónimo de 'rápido'?",
    answers: ["Veloz", "Lento", "Rozagante"],
    correctAnswer: "Veloz"
  },
  {
    question: "Completa la siguiente frase: 'El perro es al hueso como el gato es a...'",
    answers: ["Ratón", "Piedra", "Pescado"],
    correctAnswer: "Ratón"
  },
  // Agrega las demás preguntas aquí
  
  
  { 
    question: "¿Cuál es el antónimo de 'amplio'?",
    answers: ["Grande", "Estrecho", "magno"],
    correctAnswer: "Estrecho"
  },
  {
    question: "Identifica el siguiente patrón:2, 4, 6, 8, ..",
    answers: ["8","1", "6", "10" , "11", "9"],
    correctAnswer: "10"
  },
  
  
  {
    question: "¿Cuál es el resultado de 3 + 5 * 2?",
    answers: ["12","11", "6", "13" , "11", "29"],
    correctAnswer: "13"
  },

{
  
    question: "Si todos los gatos son animales y algunos animales son perros, ¿es cierto que todos los perros son gatos?",
    answers: ["Si","No", "talvez"],
    correctAnswer: "No"
  },


 {
    question: " Resuelve la siguiente ecuación: 2x + 5 = 13",
    answers: ["x = 4","x = 14", "x = 2", "x = 8" , "x = 10", "x = 3"],
    correctAnswer: "x = 4"
  },
  
  

 {
    question: " Resuelve la siguiente ecuación: 2x + 5 = 13",
    answers: ["x = 4","x = 14", "x = 2", "x = 8" , "x = 10", "x = 3"],
    correctAnswer: "x = 4"
  },

 {
    question: "Calcula el área de un rectángulo con base 6 cm y altura 4 cm",
    answers: ["23 cm²","25 cm²", "20 cm²", "24 cm²" , "22 cm²", "28 cm²"],
    correctAnswer: "24 cm²"
  },

{
    question: "Si un producto cuesta $20 y tiene un descuento del 15%, ¿cuál es el precio final?",
    answers: ["$12","$15", "$60", "$13" , "$17", "$09"],
correctAnswer: "$17"
  },
  

{
    question: "Imagina que doblas un papel por la mitad y luego lo cortas en forma diagonal. ¿Cómo se vería la forma resultante al desplegarlo?",
    answers: ["Un triángulo","Un cuadrado", "un rectángulo"],
    correctAnswer: "Un triángulo"
  },


 {
    question: "Identifica la palabra que no encaja en el siguiente grupo:",
    answers: ["manzana","plátano", "naranja", "perro"],
    correctAnswer: "perro"
  },

{
    question: "¿Cuántas vocales hay en la palabra 'inteligencia'?",
    answers: ["12","11", "6", "5" , "8", "4"],
    correctAnswer: "5"
  },
  
  
  
];

const totalQuestions = 30; // Número total de preguntas
const randomQuestions = getRandomQuestions(totalQuestions);

let currentQuestionIndex = 0;
let userAnswers = [];
let timer;
const totalTimeInSeconds = 60;
let remainingTime = totalTimeInSeconds;

const menuContainer = document.getElementById("menu-container");
const startButton = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const resultElement = document.getElementById("result");
const restartButton = document.getElementById("restart-btn");
const timerElement = document.getElementById("timer");

function getRandomQuestions(total) {
  const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  return shuffledQuestions.slice(0, total);
}

function startTest() {
  menuContainer.style.display = "none";
  questionContainer.style.display = "block";
  nextButton.style.display = "block";
  showQuestion();
  startTimer();
}

function showQuestion() {
  const currentQuestion = randomQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  answersElement.innerHTML = "";

  currentQuestion.answers.forEach(answer => {
    const liElement = document.createElement("li");
    const inputElement = document.createElement("input");
    
    
    inputElement.type = "checkbox"; // Cambiar el tipo a checkboxes
    
    
    
    inputElement.name = "answer";
    inputElement.value = answer;
    inputElement.addEventListener("click", enableNextButton);
    liElement.appendChild(inputElement);
    liElement.appendChild(document.createTextNode(answer));
    answersElement.appendChild(liElement);
  });
}

function enableNextButton() {
  nextButton.disabled = false;
}

function nextQuestion() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (selectedAnswer) {
    const answer = selectedAnswer.value;
    userAnswers.push(answer);
  } else {
    userAnswers.push("");
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < randomQuestions.length) {
    showQuestion();
    nextButton.disabled = true;
  } else {
    finishTest();
  }
}

function finishTest() {
  clearInterval(timer);
  questionContainer.style.display = "none";
  nextButton.style.display = "none";
  resultContainer.style.display = "block";
  
  const score = calculateScore();
  const scorePercentage = (score / randomQuestions.length) * 100;
  resultElement.textContent = `Tu puntuación es ${score}/${randomQuestions.length} (${scorePercentage}%)`;
  restartButton.style.display = "block";
}

function calculateScore() {
  let score = 0;
  for (let i = 0; i < randomQuestions.length; i++) {
    if (userAnswers[i] === randomQuestions[i].correctAnswer) {
      score++;
    }
  }
  return score;
}

function restartTest() {
  currentQuestionIndex = 0;
  userAnswers = [];
  remainingTime = totalTimeInSeconds;
  resultContainer.style.display = "none";
  restartButton.style.display = "none";
  startTest();
}

function startTimer() {
  timer = setInterval(() => {
    remainingTime--;
    if (remainingTime <= 0) {
      clearInterval(timer);
      finishTest();
    }
    updateTimer();
  }, 1000);
}

function updateTimer() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  
  
  
  
  
}

startButton.addEventListener("click", startTest);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartTest);