/**
 * Validates and ensures the limit does not exceed a maximum allowed value.
 */
const validateLimit = (limit, maxLimit = 100) => {
  return Math.min(limit, maxLimit);
};

module.exports = { validateLimit };
