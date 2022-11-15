const express = require("express");
const { app, io, server } = require("./ioServer");
const cors = require("cors");
const { socketInit } = require("./socketEvents");
const bodyParser = require("body-parser");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// leaderboards route
const Leaderboards = require("./routes/Leaderboards");

app.use("/", Leaderboards);

io.on("connection", (socket) => socketInit(socket));

module.exports = { server };
