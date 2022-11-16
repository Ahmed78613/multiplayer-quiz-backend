const express = require('express');
const { app, io, server } = require('./ioServer');
const cors = require('cors');
const { socketInit } = require('./socketEvents');
const bodyParser = require('body-parser');
const Leaderboards = require('./routes/Leaderboards');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/', Leaderboards);

//Connect Socket.io
io.on('connection', (socket) => socketInit(socket));

module.exports = { server, app };
