require('dotenv').config();
const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('update', (data) => {
    socket.broadcast.emit('update', data);
  });
});

server.listen(4000, () =>
  console.log('Server is listening on http://localhost:4000')
);
