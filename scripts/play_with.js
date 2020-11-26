

$(function () {
  var socket = io();

  socket.on('chat message', function (msg) {
    // $('#messages').append($('<li>').text(msg));
  })
});

function createGame() {
  socket.emit('newGame');
  // instead of init, redirect to lobby room
}

function joinGame() {
  const code = gameCode.value();
  socket.emit('joinGame', code);
  // instead of init, redirect to lobby room
}


var roomsRef = db.collection("rooms");

// creates a room for players to inhabit
function createRoom() {
  let roomCode = createRoomCode();
  let roomName = "room-" + roomCode;
  console.log("create Room function called " + roomName);
  roomsRef.doc(roomName).set({
    name: roomName,
    inviteID: roomCode
  })
}

// makes a four digit room code
function createRoomCode() {
  let digit1 = Math.random();
  digit1 *= 10;
  digit1 = Math.floor(digit1);
  let digit2 = Math.random();
  digit2 *= 10;
  digit2 = Math.floor(digit2);
  let digit3 = Math.random();
  digit3 *= 10;
  digit3 = Math.floor(digit3);
  let digit4 = Math.random();
  digit4 *= 10;
  digit4 = Math.floor(digit4);
  let roomCode = "" + digit1 + digit2 + digit3 + digit4;
  return roomCode;
}

// assign room code to user
