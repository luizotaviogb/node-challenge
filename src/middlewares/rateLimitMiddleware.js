const rateLimit = require('express-rate-limit');
const { sendResponse } = require('../utils/responseUtils');

const requestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  handler: (req, res) => {
    sendResponse(
      res,
      429,
      false,
      'Too many login attempts, please try again after 1 minute',
    );
  },
});

module.exports = requestLimiter;
