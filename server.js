const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Run when client connects
io.on("connection", socket => {
    //Welcome current user
    socket.emit("message", "Welcome!");

    //Broadcast when a user connect
    socket.broadcast.emit("message", "A user has joined the chat");

    //Runs when client disconnects
    socket.on("disconnect", () => {
        io.emit("message", "A user has left the chat");
    });

    //Listen for chatMessage from react
    socket.on("chatMessage", msg => {
        io.emit("message", msg);
    });
});

const port = process.env.port || 3000;

server.listen(port, () => console.log(`Server running on port ${port}`));
