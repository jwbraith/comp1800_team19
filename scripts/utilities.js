module.exports = {
  createRoomCode,
  retrieveLobby: function () {
    console.log("called: retrieve Lobby");
    return lobby;
  }
}

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

let lobby = "<button id='readyButton' type='button' class='btn-warning text-dark' onclick='initGame()'>Players Ready</button></div><h1 id='roomCodeTitle'>Your Room Code is: <span id='roomCodeDisplay'></span></h1><div id='playersGrid' class='bg-primary text-dark'><div id='playerCount'>Number of Players: </div><div id='playerList'><ul></ul></div>";


