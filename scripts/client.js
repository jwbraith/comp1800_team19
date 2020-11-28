const socket = io();
//this bit displays the room code in lobby.html
const roomCodeDisplay = document.getElementById("roomCodeDisplay");
socket.on('roomCode', handleRoomCode);
socket.on('unknownRoom', handleUnknownRoom);
socket.on('new arrival', handleNewArrival);
socket.on('client count', displayClientCount);


const roomCodeField = document.getElementById("roomCodeField");


function createRoom() {
  socket.emit('newRoom');
  // redirectJoinLobby();
}

function joinRoom() {
  const code = roomCodeField.value;
  socket.emit('joinRoom', code);
  console.log("Tried to join room " + code);
  // redirectJoinLobby();
}

function handleNewArrival(arrival) {
  console.log("Look who's joined, it's " + arrival);
}

function handleUnknownRoom(room) {
  console.log("Could not find a room " + room);
}

function handleRoomCode(roomCode) {
  roomCodeDisplay.innerHTML = roomCode;
}

function displayClientCount(clients) {
  console.log(clients);
}

function redirectJoinLobby() {
  console.log("redirect function called");
  setTimeout(() => {
    window.location.replace('lobby.html')
  }, 2000);
}


let playerNumber;

