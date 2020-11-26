//REQUIRE
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const $ = require('jquery');
const fs = require('fs');
const { dirname } = require('path');


//STATIC DIRECTORIES
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/styles', express.static(__dirname + '/styles'));
app.use('/images', express.static(__dirname + '/images'));


// SOCKET.IO
io.on('connection', (socket) => {
  console.log("A user connected: " + socket.id);
})


//APP GETS
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/play_with.html");
})

app.use((req, res) => {
  res.status(404).send("Nothing found, 404");
})

server.listen(8000, () => {
  console.log("Listening . . ." + __dirname);
})


