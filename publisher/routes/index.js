const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const axios = require('axios');

router.get('/', function(req, res, next) {
  res.json({ message: 'Publisher API' });
});

const topicsToSubscribers = {};

router.post('/subscribe/:topic', function(req, res, next) {
  const topic = req.params.topic;
  const url = req.body.url;

  if (topicsToSubscribers[topic] instanceof Set) {
    topicsToSubscribers[topic].add(url);
  } else {
    const subscribers = new Set();
    subscribers.add(url);
    topicsToSubscribers[topic] = subscribers;
  }

  res.json({ topic, url });
});

router.post('/publish/:topic', async function(req, res, next) {
  const topic = req.params.topic;
  logger.info(`Message received for topic ${topic}`);

  const errors = [];
  if (topicsToSubscribers[topic] instanceof Set) {
    const subs = topicsToSubscribers[topic];
    for (const subscriberWebhook of subs) {
      try {
        const response = await axios.post(subscriberWebhook, {
          topic,
          payload: req.body
        });
        if (response.status !== 200) {
          throw new Error();
        }
      } catch (error) {
        errors.push(`Publish failed for subscriber with url: ${subscriberWebhook}`);
      }
    }
  }

  if (errors.length > 0) {
    res.status(502).json({ errors });
  } else {
    res.status(204).send();
  }
});

module.exports = router;
