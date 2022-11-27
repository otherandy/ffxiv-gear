import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import app from './app';
import { Server, Socket } from 'socket.io';

const port = process.env.PORT || 4000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

io.on('connection', (socket: Socket) => {});

server.listen(port, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Server is listening on http://localhost:${port}`);
  }
});
