const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');

router.post('/webhook', function(req, res, next) {
  logger.info(`Received payload: ${JSON.stringify(req.body)}`);
  res.status(200).json({ ok: true });
});

module.exports = router;
