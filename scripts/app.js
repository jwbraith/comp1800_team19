const countdown = document.getElementById('counter-container')
const questionContainerElement = document.getElementById('questions-container')
const startButton = document.getElementById('start-button')
const questionElement = document.getElementById("questions-prompt");


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


window.onload = function () {
  startButton.addEventListener("click", startGame);
}

function startGame() {
  console.log('Game Started')
  countdown.classList.add('hide')
  countdown.classList.remove('grid')
  startButton.classList.add('hide')
  questionContainerElement.classList.remove('hide')
  setQuestion()

}

function setQuestion() {
  db.collection("questions").doc("01")
    .onSnapshot(function (snap) {
      const option1 = snap.data().correct_answer;
      const option2 = snap.data().incorrect_answers[0];
      const option3 = snap.data().incorrect_answers[1];
      const option4 = snap.data().incorrect_answers[2];


      let shuffled = [option1, option2, option3, option4];
      shuffle(shuffled)

      btn1.innerText = shuffled[0];
      btn2.innerText = shuffled[1];
      btn3.innerText = shuffled[2];
      btn4.innerText = shuffled[3];


      questionArray = isCorrect(questionArray)

      questionElement.innerText = snap.data().question;

      console.log(questionArray)

    })
    

    
}

function isCorrect(array) {

  let array1 = [{
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
]
  db.collection("questions").doc("01")
    .onSnapshot(function (snap) {

      correctAnswer = snap.data().correct_answer;
      

      if (btn1.innerText === correctAnswer) {
        array1[0].correct = true;

      } else if (btn2.innerText === correctAnswer) {
        array1[1].correct = true;

      } else if (btn3.innerText === correctAnswer) {
        array1[2].correct = true;

      } else {
        array1[3].correct = true;
      }

      console.log(array1)

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

