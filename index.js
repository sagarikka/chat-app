//Node server which will handle socket.io connection
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 3000

//to add css
app.use(express.static(__dirname+"/public"));

//socket


io.on('connection' ,(socket) =>{
    console.log("connected....")
    socket.on('message' ,(msg) =>{
       socket.broadcast.emit('message' ,msg)
    })
})

app.get('/', (req,res) =>{
    res.sendFile(__dirname+"/index.html");
})

server.listen(PORT,() =>{
    console.log("server listening on port  "+PORT)
})