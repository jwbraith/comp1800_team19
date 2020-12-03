const socket = io();
//this bit displays the room code in lobby.html
const roomCodeDisplay = document.getElementById("roomCodeDisplay");
let headCount;
let nameCalling;
socket.on('roomCode', handleRoomCode);
socket.on('unknownRoom', handleUnknownRoom);
socket.on('new arrival', handleNewArrival);
socket.on('numClients', displayClientCount);
socket.on('userList', handleUserList);

//3rd step of starting game, when client receives message the handleGameStart function is called
socket.on('startGame', handleGameStart);


function handleJig(msg) {
  console.log(msg);
}

// the goal with this jquery is to include info in server requests
// that indicate whether we are creating or joining a room
$(document).ready(function () {
  $('#createButton').on('click', function () {
    console.log('clicked create button');
    // var user = firebase.auth().currentUser;
    //     if (user != null) {
    //       console.log(user.displayName);
    //       socket.display = user.displayName;
    //       console.log(socket.displayName);
    //     }
    socket.emit('newRoom');

    $.ajax({
      url: "/create-GET",
      datatype: "json",
      type: "GET",
      data: {
        entrance: "create",
        creator: socket.id,
      },
      success: function (data) {
        console.log("room data: " + data['room']);

        let yourRoom = data['room'];
        $('#grid').html(data["lobbyHTML"]);
        $('#roomCodeDisplay').text(yourRoom);
        $('#playerList').append('<li>' + socket.displayName + "</li>");
        $('#playerCount').text('Number of Players: ' + 1);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("ERROR: ", jqXHR, textStatus, errorThrown);
      }
    })
  })

  $('#joinButton').on('click', function () {
    console.log('clicked join button');
    // var user = firebase.auth().currentUser;
    //     if (user != null) {
    //       console.log(user.displayName);
    //       socket.display = user.displayName;
    //       console.log(socket.displayName);
    //     }

    console.log("grabbing room code field " + $('#roomCodeField').val());
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
        $('#playerList').append('<li>' + socket.displayName + '</li>');
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("ERROR: ", jqXHR, textStatus, errorThrown);
      }
    })
  })

  
})

// the first step of beginning the game,
// onClick of ready button
function initGame() {
  let roomCode = $('#roomCodeDisplay').text();
  console.log("clicked ready button " + roomCode);
  socket.emit('sendToGame', roomCode);
  clearInterval(count);
  clearInterval(nameCalling);
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
  console.log(clients);
  // console.log(clients[0]);
  let list = Object.keys(clients);
  let listToPutInPlace = "";
  console.log(list);
  for (let i = 0; i < list.length; i++) {
    nameToDisplay = list[i];
    listToPutInPlace += "<li class='playerName'>" + nameToDisplay + "</li>";
  };
  $('#playerList').replaceWith(listToPutInPlace);
}

//fourth step of starting a game, function waits a second
// and then makes an ajax call to the server to retrieve the game body html
function handleGameStart() {
  
  console.log("handling game start");
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


$(document).ready(function () {
  count = setInterval(function updatePlayerCount() {
    let roomCode = $('#roomCodeDisplay').text();
    socket.emit('reqPlayerCount', roomCode);
  }, 1000);

  nameCalling = setInterval(function updatePlayerList() {
    let roomCode = $('#roomCodeDisplay').text();
    socket.emit('reqPlayerNames', roomCode);
  }, 2000);
})



let playerNumber;
