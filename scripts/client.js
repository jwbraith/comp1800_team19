const socket = io();
//this bit displays the room code in lobby.html
const roomCodeDisplay = document.getElementById("roomCodeDisplay");
socket.on('roomCode', handleRoomCode);
socket.on('unknownRoom', handleUnknownRoom);
socket.on('new arrival', handleNewArrival);
socket.on('numClients', displayClientCount);
socket.on('userList', handleUserList);
socket.on('startGame', handleGameStart);


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
        console.log(data['room']);
        let yourID = socket.id;
        console.log(yourID);
        let yourRoom = data['room'];
        $('#grid').html(data["lobbyHTML"]);
        $('#roomCodeDisplay').text(yourRoom);
        $('#playerList').append('<li>' + socket.id + "</li>");
        $('#playerCount').text('Number of Players: ' + 1);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("ERROR: ", jqXHR, textStatus, errorThrown);
      }
    })
  })

  $('#joinButton').on('click', function () {
    console.log('clicked join button');
    console.log($('#roomCodeField').val());
    let code = $('#roomCodeField').val();
    console.log(code);
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

function initGame() {
  let roomCode = $('#roomCodeDisplay').text();
  console.log("clicked ready button");
  socket.emit('sendToGame', roomCode);
}
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
  $('#playerCount').text('Number of Players: ' + clients);
}

function handleUserList(clients) {
  let list = Object.keys(clients);
  let listToPutInPlace = "";
  console.log(Object.keys(clients));
  for (let i = 0; i < list.length; i++) {
    listToPutInPlace += "<li class='playerName'>" + list[i] + "</li>";
  };
  $('#playerList').replaceWith(listToPutInPlace);
}

function handleGameStart() {
  setTimeout(function () {
    console.log("handling game start");
    $.ajax({
      url: "/start-GET",
      datatype: "html",
      type: "GET",
      data: {
        entrance: "join",
        entrant: socket.id,
      },
      success: function (data) {
        console.log("game start: ", data);
        $('body').html(data);

      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("ERROR: ", jqXHR, textStatus, errorThrown);
      }
    })
  }, 1000)

}




function redirectJoinLobby() {
  console.log("redirect function called");
  setTimeout(() => {
    window.location.replace('lobby.html')
  }, 2000);
}
$(document).ready(function () {
  setInterval(function updatePlayerCount() {
    let roomCode = $('#roomCodeDisplay').text();
    socket.emit('reqPlayerCount', roomCode);
  }, 1000);

  setInterval(function updatePlayerList() {
    let roomCode = $('#roomCodeDisplay').text();
    socket.emit('reqPlayerNames', roomCode);
  }, 2000);
})



let playerNumber;
