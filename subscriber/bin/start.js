#!/usr/bin/env node

const http = require('http');
const app = require('../app');
const axios = require('axios');

const logger = require('../utils/logger.js')
const CONSTANTS = require('../utils/constants');

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

async function registerSubscription() {
  try {
    const topic = CONSTANTS.TOPIC;
    if (typeof topic !== 'string' || (topic && topic.length < 1)) throw new Error('Invalid topic');
    const response = await axios.post(`${CONSTANTS.SUBSCRIPTION_URL}/${topic}`, {
      url: `http://localhost:${port}/webhook`
    })
    logger.info(`Subscribed to topic successfully: ${JSON.stringify(response.data)}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

const hostname = '0.0.0.0';
const port = process.env.PORT || 8000;
const server = http.createServer(app);


server.listen(port, hostname);
server.on('error', onError);
server.on('listening', onListening);

registerSubscription();
