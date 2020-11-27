const countdown = document.getElementById('counter-container')
const questionContainerElement = document.getElementById('questions-container')
const startButton = document.getElementById('start-button')
const questionElement = document.getElementById('questions-prompt')
const scoreAndTimer = document.getElementById('score-timer-container')
const answerButtons = document.getElementById('answer-btn')
const timer = document.getElementById('timer')
let scoreContainer = document.getElementById('score-counter')
let resultMessage = document.getElementById('result-message')
let answerResult = document.getElementById('answer-result')
let score = 0;
let timeStopped = false;
let timeout = false;
let currentQuestionIndex = 0;


let btn1 = document.getElementById("btn-1");
let btn2 = document.getElementById("btn-2");
let btn3 = document.getElementById("btn-3");
let btn4 = document.getElementById("btn-4");

let questionArray = [{
    text: btn1.innerText,
    correct: false
  },
  {
    text: btn2.innerText,
    correct: false
  },
  {
    text: btn3.innerText,
    correct: false
  },
  {
    text: btn4.innerText,
    correct: false
  }
];

let questionOrder = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
let shuffledOrder = shuffle(questionOrder)


function startGame() {
  console.log('Game Started')
  countdown.classList.add('hide')
  countdown.classList.remove('grid')
  questionContainerElement.classList.remove('hide')
  scoreAndTimer.classList.remove('hide')

  setQuestion()

}

//sets the question by pulling out question from the database. --> will need to implement a function that pulls out randomly rather
//than me doing it manually
function setQuestion() {

  startGameTimer()


  

  //for now! --> will have to change later if we expand on this project later!

  db.collection("questions").doc(shuffledOrder[currentQuestionIndex])
    .onSnapshot(function (snap) {
      let option1 = snap.data().correct_answer;
      let option2 = snap.data().incorrect_answers[0];
      let option3 = snap.data().incorrect_answers[1];
      let option4 = snap.data().incorrect_answers[2];


      //shuffled question list
      let questionList = [option1, option2, option3, option4];
      let shuffledQuestions = shuffle(questionList)

      //random choices assigned to buttons
      btn1.innerText = shuffledQuestions[0];
      btn2.innerText = shuffledQuestions[1];
      btn3.innerText = shuffledQuestions[2];
      btn4.innerText = shuffledQuestions[3];

      //sets up the question array so that a boolean value is associated with the choices. 
      questionArray = setCorrect(shuffledOrder, currentQuestionIndex, shuffledQuestions, questionArray)

      //displays question
      questionElement.innerText = snap.data().question;

      //used for debugging
      console.log(questionArray)


      selectAnswer(questionArray)
      
    })

  //There may be a more efficient way of doing this function
  //when one of the button is clicked, the function determines if it is correct or not.
  //if correct, calls isCorrect, if wrong, calls isWrong. Calls disableClick() regardless
  function selectAnswer(array) {
    timeout = false;
    btn1.onclick = function () {
      if (array[0].correct) {
        isCorrect()
      } else {
        isWrong()
      }
    }
    btn2.onclick = function () {
      if (array[1].correct) {
        isCorrect()
      } else {
        isWrong()
      }
    }
    btn3.onclick = function () {
      if (array[2].correct) {
        isCorrect()
      } else {
        isWrong()
      }
    }
    btn4.onclick = function () {
      if (array[3].correct) {
        isCorrect()
      } else {
        isWrong()
      }
    }

  }


  function isCorrect() {
    answerResult.classList.remove('hide')
    resultMessage.innerText = "Correct!";
    disableClick()
    score++
    scoreContainer.innerText = score;
  }

  function isWrong() {
    answerResult.classList.remove('hide')
    resultMessage.innerText = "Wrong!";
    disableClick()
  }

  function timeRanOut() {
    answerResult.classList.remove('hide')
    resultMessage.innerText = "TimeOut!";
    disableClick()
  }

  function disableClick() {
    btn1.setAttribute('disabled', true)
    btn2.setAttribute('disabled', true)
    btn3.setAttribute('disabled', true)
    btn4.setAttribute('disabled', true)
    timeStopped = true;

    resetGame()

  }

  function enableButton() {
    btn1.disabled = false;
    btn2.disabled = false;
    btn3.disabled = false;
    btn4.disabled = false;
  }

  function resetGame() {
    currentQuestionIndex++;
    
    setTimeout(function () {
      enableButton()
      answerResult.classList.add('hide')
      timeStopped = false;
      startGameTimer();
      setQuestion()
    }, 3500)
  }

  function startGameTimer() {
    var timeleft = 15;
    var downloadTimer = setInterval(function () {
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
        document.getElementById("game-timer").innerHTML = "Times Up!";
        timeRanOut()
      } else {
        document.getElementById("game-timer").innerHTML = timeleft + " seconds remaining";
      }
      timeleft -= 1;

      if (timeStopped) {
        clearInterval(downloadTimer);
        document.getElementById("game-timer").innerHTML = " ";
      }
    }, 1000);
  }

}

function setCorrect(order, i, list, array1) {

  array1 = [{
      text: list[0],
      correct: false
    },
    {
      text: list[1],
      correct: false
    },
    {
      text: list[2],
      correct: false
    },
    {
      text: list[3],
      correct: false
    }
  ];

  db.collection("questions").doc(order[i])
    .onSnapshot(function (snap) {

      correctAnswer = snap.data().correct_answer;


      if (list[0] === (correctAnswer)) {
        array1[0].correct = true;

      } else if (list[1] === (correctAnswer)) {
        array1[1].correct = true;

      } else if (list[2] === (correctAnswer)) {
        array1[2].correct = true;

      } else {
        array1[3].correct = true;
      }


    })

  return array1;

}

//This function shuffles elements inside an array --> used to shuffle the question orders
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


// creates a room for players to inhabit
function createRoom() {
  console.log("create Room function called");
  roomsRef.doc("room1").set({
    name: "room1",
    inviteID: "8945"
  })
}


function Countdown() {
  var timeleft = 5;
  var downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      document.getElementById("count").innerHTML = "Times Up!";
      startGame()
    } else {
      document.getElementById("count").innerHTML = "Game Starting in: " + timeleft;
    }
    timeleft -= 1;
  }, 1000);
}

Countdown()