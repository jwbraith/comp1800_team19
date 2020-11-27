

    // socket.on('chat message', function (msg) {
    //   // $('#messages').append($('<li>').text(msg));
    // })
  
const roomCodeDisplay = document.getElementById("roomCodeDisplay");
socket.on('roomCode', handleRoomCode);

function createGame() {
  socket.emit('newGame');
  // instead of init, redirect to lobby room
}


function joinGame() {
  const code = gameCode.value();
  socket.emit('joinGame', code);
  // instead of init, redirect to lobby room
}

function handleRoomCode(gameCode) {
  roomCodeDisplay.innerHTML = gameCode;
}


let playerNumber;

