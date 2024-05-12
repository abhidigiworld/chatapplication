const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const { createServer } = require('http');
const app = express();

const port = process.env.PORT || 3000;

app.use(cors()); 

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.get("/", (req, res) => {
  res.send("Get called from the server");
});

io.on('connection', (socket) => {
  console.log("Socket connected");
  console.log(socket.id);

  socket.on('message', (message) => {
    console.log("Received message:", message);


    io.emit('message', message);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
