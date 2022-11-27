import express from 'express';
import cors from 'cors';

import characterRoutes from './routes/character';

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/characters', characterRoutes);

export default app;
