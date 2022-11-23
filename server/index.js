require('dotenv').config();
const app = require('./src/app');
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
  console.log(`User connected ${socket.id}`);
});

server.listen(4000, () => console.log('Server is running on port 4000'));
