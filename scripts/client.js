

    // socket.on('chat message', function (msg) {
    //   // $('#messages').append($('<li>').text(msg));
    // })

    
//this bit displays the room code in lobby.html
const roomCodeDisplay = document.getElementById("roomCodeDisplay");
socket.on('roomCode', handleRoomCode);


const roomCodeField = document.getElementById("roomCodeField");


function createRoom() {
  socket.emit('newRoom');
  // instead of init, redirect to lobby room
}


function joinRoom() {
  const code = roomCodeField.value;
  socket.emit('joinRoom', code);
  console.log("Tried to join room " + code);
  // instead of init, redirect to lobby room
}

function handleRoomCode(roomCode) {
  roomCodeDisplay.innerHTML = roomCode;
}


let playerNumber;

