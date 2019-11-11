const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
// we set the "server" var manually here instead of express behind the scenes because we need
// it in order to give it to socket.io and connect to it
const server = http.createServer(app);

// in order for socket.io to work we need to integrate it in the client-side as well,
// not only here
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

io.on("connection", socket => {
  console.log("New WebSocket connection!");

  socket.emit("message", "Welcome!");
  socket.broadcast.emit("message", "A new user has joined!");

  socket.on("sendMessage", message => {
    io.emit("message", message);
  });

  // when user disconnects we use "socket.on" inside the "io.on" event
  socket.on("disconnect", () => {
    io.emit("message", "A user has left");
  });
});

server.listen(port, () => {
  console.log(`Server dancing on port ${port} ( pid: ${process.pid} )`);
});
