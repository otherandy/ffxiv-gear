import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import mongoose from 'mongoose';
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

mongoose.connect(process.env.DATABASE_URL!);
const db = mongoose.connection;

db.once('open', () => {
  console.log('Database connection established successfully');

  const characterStream = db
    .collection('Character')
    .watch([], { fullDocument: 'updateLookup' });

  characterStream.on('change', (change) => {
    switch (change.operationType) {
      case 'insert':
        io.emit('insert', change.fullDocument);
        break;
      case 'update':
        const updatedCharacter = change.fullDocument!;
        updatedCharacter.id = updatedCharacter._id;
        delete updatedCharacter._id;
        io.emit('update', change.fullDocument);
        break;
      case 'delete':
        io.emit('delete', change.documentKey._id);
        break;
      default:
        break;
    }
  });
});

io.on('connection', (socket: Socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on('disconnect', () => console.log(`User disconnected ${socket.id}`));
});

server.listen(port, () => console.log(`Server is running on port ${port}`));
