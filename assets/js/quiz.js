const questions = [{
    question: "What year is it?",
    answers: ["1989", "2004", "2017", "2015"],
    correct: "2017"
  },
  {
    question: "What is Batman's true identity?",
    answers: ["John Travolta", "Bruce Wayne", "The Pope", "Vladimir Putin"],
    correct: "Bruce Wayne"
  },
  {
    question: "Which animal is the superior one?",
    answers: ["Dog", "Cat", "Llama", "Gecko"],
    correct: "Dog"
  },
  {
    question: "WHAT?!",
    answers: ["What?", "Nothing", "Lil Jon", "Are you high?"],
    correct: "Lil Jon"
  },
  {
    question: "Where does Bilbo Baggins come from?",
    answers: ["Paris", "Mordor", "Your house", "Shire"],
    correct: "Shire"
  },
  {
    question: "How great is this quiz?",
    answers: ["It's really bad", "The greatest", "It's alright", "Could be better"],
    correct: "Could be better"
  }
];
const questionDisplay = document.querySelector('.question');
const answersNodeList = document.querySelectorAll('.answer');
const answersDisplay = Array.prototype.slice.call(answersNodeList);
const msgDisplay = document.querySelector('.msg');
const mainDisplay = document.querySelector('main');
const endScreen = document.querySelector('.end-screen');
let questionNumber = 0;
let mistakes = 0;

newQuestion();

answersDisplay.forEach(function(el) {
  el.addEventListener('click', function() {
    if (this.innerHTML === questions[questionNumber].correct) {
      msgDisplay.innerHTML = 'CORRECT!';
      toggler('correct');
      setTimeout(function() {
        toggler('correct');
        questionNumber++;
        newQuestion(questionNumber);
      }, 2000);
    } else {
      mistakes++;
      if (this.innerHTML === 'Are you high?') {
        msgDisplay.innerHTML = 'MAYBE!';
      } else {
        msgDisplay.innerHTML = 'WRONG!';
      }
      toggler('wrong');
      setTimeout(function() {
        toggler('wrong');
      }, 2000);
    }
  });
});

function toggler(answer) {
  msgDisplay.classList.toggle(`msg-${answer}`);
  mainDisplay.classList.toggle('blur');
  questionDisplay.classList.toggle('blur');
}

function newQuestion() {
  if (questionNumber === questions.length) {
    endQuiz();
    return;
  }
  questionDisplay.innerHTML = questions[questionNumber].question;
  let answers = questions[questionNumber].answers;
  for (i = 0; i < answersDisplay.length; i++) {
    let index = random(answers.length);
    answersDisplay[i].innerHTML = answers[index];
    answers.splice(index, 1);
  };
};

function endQuiz() {
  const endMsgs = [
    `You finished The Great Quiz and made ${mistakes} mistakes.<br>Could be better.`,
    `You finished The Great Quiz without making any mistakes.<br>Incredible!`,
    `You finished The Great Quiz and made only one mistake.<br>Well done!`,
    `You did finish The Great Quiz but You also made ${mistakes} mistakes.<br>Pretty terrible!`
  ];
  if (mistakes === 0) {
    questionDisplay.innerHTML = `<h1>CONGRATULATIONS!</h1><p>${endMsgs[1]}</p>`;
  } else if (mistakes === 1) {
    questionDisplay.innerHTML = `<h1>CONGRATULATIONS!</h1><p>${endMsgs[2]}</p>`;
  } else if (mistakes > 1 && mistakes < 5) {
    questionDisplay.innerHTML = `<h1>CONGRATULATIONS!</h1><p>${endMsgs[0]}</p>`;
  } else {
    questionDisplay.innerHTML = `<h1>CONGRATULATIONS!</h1><p>${endMsgs[3]}</p>`;
  }
  for (i = 0; i < answersDisplay.length; i++) {
    answersDisplay[i].innerHTML = '';
    answersDisplay[i].style.pointerEvents = 'none';
  };
};

function random(arrLength) {
  return Math.floor(Math.random() * arrLength);
}
