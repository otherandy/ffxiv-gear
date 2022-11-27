import express from 'express';
import cors from 'cors';
import './db';

import characterRouter from './routes/character.routes';

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/characters', characterRouter);

export default app;
