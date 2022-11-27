import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import http from 'http';
import { Server, Socket } from 'socket.io';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: Socket) => {
  socket.on('update', (data) => {
    socket.broadcast.emit('update', data);
  });
});

server.listen(4000, () =>
  console.log('Server is listening on http://localhost:4000')
);
