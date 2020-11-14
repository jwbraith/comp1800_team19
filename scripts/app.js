const countdown = document.getElementById('counter-container')
const questionContainerElement = document.getElementById('questions-container')
const startButton = document.getElementById('start-button')

window.onload=function(){
    startButton.addEventListener("click", startGame);
  }

function startGame() {
    console.log('Game Started')
    countdown.classList.add('hide')
    countdown.classList.remove('grid')
    startButton.classList.add('hide')
    questionContainerElement.classList.remove('hide')

}
//Will have to find a way to randomize the questions that we pull out from the database and mix up the order of the multiple choices. 
function readQuestion() {
    db.collection("questions").doc("01")
    .onSnapshot(function(snap){
        document.getElementById("questions-prompt").innerText = snap.data().question;
        document.getElementById("btn-1").innerText = snap.data().correct_answer;
        document.getElementById("btn-2").innerText = snap.data().incorrect_answers[0];
        document.getElementById("btn-3").innerText = snap.data().incorrect_answers[1];
        document.getElementById("btn-4").innerText = snap.data().incorrect_answers[2];
    })
}

readQuestion();

var roomsRef = db.collection("rooms");

// creates a room for players to inhabit
function createRoom() {
  console.log("create Room function called");
  roomsRef.doc("room1").set({
    name: "room1",
    inviteID: "8945"
  })
}
