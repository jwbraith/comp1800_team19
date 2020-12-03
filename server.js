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
const clientNames = {};

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
    client.number = 1;
    console.log(client.id + " joined room " + clientRooms[client.id]);
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
    // let names = [];
    if (room) {
      console.log(room);
      allUsers = room.sockets;
    }
    
    console.log(allUsers);
    client.emit('userList', allUsers);
  }

  // step 2 of game beginning when the server receives the sendToGame message from client
  // it calls the handleSend function
  client.on('sendToGame', handleSend);

  //step 2.5 of game start, takes the roomCode and fires off the startGame emission to that room as specified by roomCode
  function handleSend(roomCode) {
    // let room = io.nsps['/'].adapter.rooms[roomCode];
    console.log("handling send " + roomCode + " that was room code");
    io.to(roomCode).emit('startGame');
    console.log("after emissions");
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
  let entranceType = req.query['entrance'];
  let host = req.query['creator'];
  if (entranceType == "create") {
    res.setHeader('Content-Type', 'application/json');
    let lobby = utilities.retrieveLobby();
    console.log(clientRooms[host]);
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
  res.sendFile(__dirname + "/game-body.html");
})



app.use((req, res) => {
  res.status(404).send("<h1>Nothing found, 404</h1>");
})

server.listen(8000, () => {
  console.log("Listening . . ." + __dirname);
})


