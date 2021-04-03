#!/usr/bin/env node

const app = require('../app');
const http = require('http');
const logger = require('../utils/logger');


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  logger.info(`Listening on ${addr.address}:${addr.port}`);
}

const hostname = '0.0.0.0';
const port = process.env.PORT || '9000';
const server = http.createServer(app);

server.listen(port, hostname);
server.on('error', onError);
server.on('listening', onListening);
