const express = require('express');
const helmet = require('helmet');

const zoosRoutes = require("./zoos/router");


const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.use("/api/zoos", zoosRoutes);

module.exports = server;