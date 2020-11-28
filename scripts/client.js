const socket = io();
//this bit displays the room code in lobby.html
const roomCodeDisplay = document.getElementById("roomCodeDisplay");
socket.on('roomCode', handleRoomCode);
socket.on('unknownRoom', handleUnknownRoom);
socket.on('new arrival', handleNewArrival);
socket.on('client count', displayClientCount);


// the goal with this jquery is to include info in server requests
// that indicate whether we are creating or joining a room
$(document).ready(function () {
  $('#createButton').on('click', function () {
    socket.emit('newRoom');
  })

  $('#createButton').on('click', function () {
    console.log('clicked create button');
    // socket.emit('newRoom');
    $.ajax({
      url: "/create-GET",
      datatype: "html",
      type: "GET",
      data: {
        entrance: "create",
        creator: socket.id,
      },
      success: function (data) {
        console.log(data);
        // $('#grid').html(data[1]);
        // window.location.href = "/lobby.html";
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("ERROR: ", jqXHR, textStatus, errorThrown);
      }
    })
  })

  $('#joinButton').on('click', function () {
    console.log('clicked join button');

    $.ajax({
      url: "/join-GET",
      datatype: "html",
      type: "GET",
      data: { entrance: "join" },
      success: function (data) {
        console.log("join-GET: ", data);
        $('#grid').html(data);
        // window.location.href = "/lobby.html";
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("ERROR: ", jqXHR, textStatus, errorThrown);
      }
    })
  })
})

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
