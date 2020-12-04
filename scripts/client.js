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
    var user = firebase.auth().currentUser;
        if (user != null) {
          display = user.displayName;
        }
    socket.emit('newRoom', display);

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
        socket.emit('reqPlayerNames', yourRoom);
        $('#playerCount').text('Number of Players: ' + 1);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("ERROR: ", jqXHR, textStatus, errorThrown);
      }
    })
  })

  $('#joinButton').on('click', function () {
    console.log('clicked join button');
    var user = firebase.auth().currentUser;
        if (user != null) {
          display = user.displayName;
        }

    console.log("grabbing room code field " + $('#roomCodeField').val());
    let code = $('#roomCodeField').val();
    console.log(code);
    socket.emit('joinRoom', code, display);
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
        socket.emit('reqPlayerNames', code);
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

function handleNewArrival(arrival, arrivingName) {
  console.log("Look who's joined, it's " + arrival);
  $("#playerList").append("<li class='name' id='player'>" + arrivingName + "</li>");
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

function handleUserList(clients, clientNames) {
  // console.log(clients[0]);
  let list = Object.keys(clients);
  let listToPutInPlace = "";
  // console.log("Number of names to display: " + list.length);
  // console.log("here's the list of clients: " + list);
  for (let i = 0; i < list.length; i++) {
    
    listToPutInPlace += "<li class='name' id='player" + i + "'></li>";
  };
  $('#playerList').contents("ul").replaceWith(listToPutInPlace);
  for (let i = 0; i < list.length; i++) {
    nameToDisplay = clientNames[list[i]];
    $('.name').each(function () {
      this.innerText = nameToDisplay;
    })
  }
}

//fourth step of starting a game, function waits a second
// and then makes an ajax call to the server to retrieve the game body html
function handleGameStart() {
  
  console.log("handling game start");
  setTimeout(function () {
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


// $(document).ready(function () {
  count = setInterval(function updatePlayerCount() {
    let roomCode = $('#roomCodeDisplay').text();
    socket.emit('reqPlayerCount', roomCode);
  }, 1000);

  nameCalling = setInterval(function updatePlayerList() {
    let roomCode = $('#roomCodeDisplay').text();
    console.log("You called?");
    socket.emit('reqPlayerNames', roomCode);
  }, 2000);
// })



let playerNumber;
