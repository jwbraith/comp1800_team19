module.exports = {
  createRoomCode,
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

