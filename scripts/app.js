

var roomsRef = db.collection("rooms");

// creates a room for players to inhabit
function createRoom() {
  console.log("create Room function called");
  roomsRef.doc("room1").set({
    name: "room1",
    inviteID: "8945"
  })
}