const { sendResponse } = require('../utils/responseUtils');

/**
 * Middleware used to verify if all the required fields were sent
 */
const validateRequiredFields = (requiredFields) => {
  if (!Array.isArray(requiredFields)) {
    console.error('Throwing error for invalid requiredFields');
    throw new Error('requiredFields must be an array');
  }

  return (req, res, next) => {
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return sendResponse(
        res,
        400,
        false,
        `Missing required fields: ${missingFields.join(', ')}`,
      );
    }

    next();
  };
};

module.exports = validateRequiredFields;
