const { sendResponse } = require('../utils/responseUtils');

const validateRequiredFields = (requiredFields) => {
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
