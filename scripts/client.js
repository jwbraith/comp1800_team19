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
    console.log('clicked create button');
    socket.emit('newRoom');
  })

  $('#createButton').on('click', function () {
    console.log('clicked create button');
    $.ajax({
      url: "/create-GET",
      datatype: "json",
      type: "GET",
      data: {
        entrance: "create",
        creator: socket.id,
      },
      success: function (data) {
        console.log(data['roomList']);
        let allRooms = data['roomList'];
        let yourID = socket.id;
        let yourRoom = allRooms[yourID];
        $('#grid').html(data["lobbyHTML"]);
        $('#roomCodeDisplay').text(yourRoom);
        $('#playerList').append('<li>' + socket.id + "</li>");
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("ERROR: ", jqXHR, textStatus, errorThrown);
      }
    })
  })

  $('#joinButton').on('click', function () {
    console.log('clicked join button');
    let code = $('#roomCodeField').val;
    socket.emit('joinRoom', code);
    console.log("Tried to join room " + code);
    $.ajax({
      url: "/join-GET",
      datatype: "json",
      type: "GET",
      data: {
        entrance: "join",
        entrant: socket.id,
      },
      success: function (data) {
        console.log("join-GET: ", data);
        $('#grid').html(data['lobbyHTML']);
        $('#roomCodeDisplay').text(data['room']);
        $('#playerList').append('<li>' + socket.id + '</li>');
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
