const express = require('express');
const { Server } = require("socket.io");
const app = express();
const http = require('http');
const server = http.createServer(app);
// const io = new Server(server);

const io  = require('socket.io')(server, {
//  path: '/socket/laravel/socket.io',
  cors: {
      origin: "*",
      methods: ["GET", "POST"]
  }
});


// return view 
app.get('/', (req, res) => {
   res.sendFile(__dirname + '/pages/index.html');
});

var socketID = '';
// kết nối 
io.on('connection', (socket) => {
   
  //user kết nối
  console.log('a user connected: ' + socket.id);

  socketID =  socket.id;
  console.log(socketID);

  // chat message
  socket.on('client-gui-tin-nhan', (val) => {
    console.log('message: ' + val);
    //1. gửi toàn serve
    io.sockets.emit('server-gui-tin-nhan',{ 'tong':val });  // gửi message đến mn
   
    //2. Gửi lại chính mình 
    //socket.emit('server-gui-tin-nhan', "Send: "+ msg);  // gửi message đến mn
   
    //3. Gửi toàn server trừ mình 
    //socket.broadcast.emit('server-gui-tin-nhan', "Send: "+ msg);  // gửi message đến mn
   
    // gửi đến 1 người
    //io.to(socketID).emit('server-gui-tin-nhan', 'Send by: ' +socket.id + ' =>' + msg);
  });


  // ngắt kết nối
  socket.on('disconnect', function () {
     console.log('a user disconnect: ' + socket.id);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});


// ==========================================
// LINK THAM KHẢO 
// https://socket.io/docs/v3/emit-cheatsheet/
// ==========================================
