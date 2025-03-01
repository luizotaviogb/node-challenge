require('dotenv').config();
const rateLimit = require('express-rate-limit');
const { sendResponse } = require('../utils/responseUtils');

const maxLoginAttempt = process.env.MAX_LOGIN_ATTEMPT;
const loginTimeout = process.env.LOGIN_TIMEOUT;

/**
 * Used to control too many login requests
 */
const requestLimiter = rateLimit({
  windowMs: loginTimeout * 60 * 1000,
  max: maxLoginAttempt,
  handler: (req, res) => {
    sendResponse(
      res,
      429,
      false,
      `Too many login attempts, please try again after ${loginTimeout} minute(s)`,
    );
  },
});

module.exports = requestLimiter;
