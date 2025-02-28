const express = require('express');
const authController = require('../controllers/authController');
const validateRequiredFields = require('../middlewares/requestsMiddleware');
const requestLimiter = require('../middlewares/rateLimitMiddleware');

const router = express.Router();

router.post(
  '/login',
  validateRequiredFields(['login', 'password']),
  requestLimiter,
  authController.authenticate,
);
router.post(
  '/register',
  validateRequiredFields(['login', 'password']),
  authController.save,
);

module.exports = router;
