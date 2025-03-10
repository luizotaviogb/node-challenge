const { sendResponse } = require('../utils/responseUtils');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware used to verify if the request is authenticated
 */
const authMiddleware = (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return sendResponse(res, 401, false, 'Request without token');
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.id;
    next();
  } catch (error) {
    console.error(error);
    return sendResponse(res, 401, false, 'Token invalid or expired');
  }
};

module.exports = authMiddleware;
