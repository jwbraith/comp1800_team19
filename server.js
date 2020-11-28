//REQUIRE
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const $ = require('jquery');
const fs = require('fs');
const { dirname } = require('path');
const { createRoomCode } = require('./scripts/utilities.js')

const state = {};
const clientRooms = {};

//STATIC DIRECTORIES
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/styles', express.static(__dirname + '/styles'));
app.use('/images', express.static(__dirname + '/images'));


// SOCKET.IO
io.on('connection', (client) => {

  client.on('newRoom', handleNewRoom);
  function handleNewRoom() {
    let roomName = createRoomCode();
    clientRooms[client.id] = roomName;
    client.emit('roomCode', roomName);
    client.join(roomName);
    client.number = 1;
    console.log(client.id + " joined room " + clientRooms[client.id]);
  }

  client.on('joinRoom', handleJoinRoom);

  function handleJoinRoom(roomCode) {
    let room = io.sockets.adapter.rooms[roomCode];
    console.log(room);
    let allUsers;
    if (room) {
      console.log("room was true");
      allUsers = room.sockets;
    }
    console.log(allUsers);
    let numClients = 0;
    if (allUsers) {
      numClients = Object.keys(allUsers).length;
    }
    if (numClients === 0) {
      client.emit('unknownRoom', room)
      return;
    }
    // pair this client.id key with the roomCode value in the 
    // clientRooms object
    clientRooms[client.id] = roomCode;
    console.log("got to here");
    client.join(roomCode);
    io.to(roomCode).emit('new arrival', client.id);
    io.to(roomCode).emit('client count', room.sockets);
    client.number = 2;
  }


  console.log("A user connected: " + client.id);
})


//APP GETS
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/play_with.html");
})

app.get('/lobby.html', (req, res) => {
  res.sendFile(__dirname + '/lobby.html');
})

app.use((req, res) => {
  res.status(404).send("Nothing found, 404");
})

server.listen(8000, () => {
  console.log("Listening . . ." + __dirname);
})


