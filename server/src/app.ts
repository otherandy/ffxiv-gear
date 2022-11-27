import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import characterRoutes from './routes/character';

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/characters', characterRoutes);

export default app;
