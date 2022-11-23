const express = require('express');
const app = express();
const cors = require('cors');
require('./db');

const characterRouter = require('./routes/character.routes');

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/characters', characterRouter);

module.exports = app;
