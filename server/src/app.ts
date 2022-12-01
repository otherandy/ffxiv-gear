import express from 'express';
import cors from 'cors';

import characterRoutes from './routes/character';
import etroRoutes from './routes/etro';

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/characters', characterRoutes);
app.use('/etro', etroRoutes);

export default app;
