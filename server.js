//REQUIRE
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const $ = require('jquery');
const fs = require('fs');
const { dirname } = require('path');
const utilities = require('./scripts/utilities.js');

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
    let roomName = utilities.createRoomCode();
    clientRooms[client.id] = roomName;
    console.log(clientRooms);
    client.join(roomName);
    // client.displayName = profile.getFBDisplayName();
    client.number = 1;
    console.log(client.displayName + " joined room " + clientRooms[client.id]);
  }

  client.on('joinRoom', handleJoinRoom);
  function handleJoinRoom(roomCode) {
    console.log(roomCode);

    let room = io.nsps['/'].adapter.rooms[roomCode];
    console.log(client.id + " tried to join " + room);
    let allUsers;
    if (room) {
      console.log("room was true");
      allUsers = room.sockets;
    } else {
      console.log("room was false");
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
    client.to(roomCode).emit('new arrival', client.id);
    client.number = 2;
  }

  client.on('reqPlayerCount', returnPlayerCount);
  function returnPlayerCount(roomCode) {
    let room = io.nsps['/'].adapter.rooms[roomCode];
    let allUsers;
    if (room) {

      allUsers = room.sockets;
    }
    let numClients = 0;
    if (allUsers) {
      numClients = Object.keys(allUsers).length;
    }
    client.emit('numClients', numClients);
  }

  client.on('reqPlayerNames', returnPlayerNames);
  function returnPlayerNames(roomCode) {
    let room = io.nsps['/'].adapter.rooms[roomCode];
    let allUsers;
    if (room) {
      console.log(room.sockets);
      console.log(room.sockets[0]);
      allUsers = room.sockets;
    }
    client.emit('userList', allUsers);
  }

  client.on('sendToGame', handleSend);
  function handleSend(roomCode) {
    console.log("handling send");
    io.to(roomCode).emit('startGame');
  }



  console.log("A user connected: " + client.id);
})


//APP GETS
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

app.get('/profile.html', (req, res) => {
  res.sendFile(__dirname + "/profile.html");
})

app.get('/play_with.html', (req, res) => {
  res.sendFile(__dirname + "/play_with.html");
})

app.get('/create-GET', (req, res) => {
  // let roomCode = utilities.createRoomCode();
  let entranceType = req.query['entrance'];
  let host = req.query['creator'];
  if (entranceType == "create") {
    res.setHeader('Content-Type', 'application/json');
    let lobby = utilities.retrieveLobby();
    res.send({
      room: clientRooms[host],
      lobbyHTML: lobby
    });
  }
})

app.get('/join-GET', (req, res) => {
  let entranceType = req.query['entrance'];
  let guest = req.query['entrant'];
  if (entranceType == "join") {
    res.setHeader('Content-Type', 'application/json');
    let lobby = utilities.retrieveLobby();
    res.send({
      room: clientRooms[guest],
      lobbyHTML: lobby
    })
  }
})

app.get('/start-GET', (req, res) => {
  res.setHeader('Content-Type', "text/html");
  res.sendFile(__dirname + "/game.html");
})



app.use((req, res) => {
  res.status(404).send("<h1>Nothing found, 404</h1>");
})

server.listen(8000, () => {
  console.log("Listening . . ." + __dirname);
})


