/**
 * Validates and ensures the limit does not exceed a maximum allowed value.
 * - Converts invalid values (null, undefined, strings, etc.) to default.
 * - Does not allow negative values (converts them to default).
 */
const validateLimit = (limit, maxLimit = 100) => {
  const validateValue = (value, defaultValue) => {
    if (
      value === null ||
      value === undefined ||
      typeof value !== 'number' ||
      isNaN(value) ||
      value <= 0
    ) {
      return defaultValue;
    }
    return value;
  };

  limit = validateValue(limit, 10);
  maxLimit = validateValue(maxLimit, 100);

  return Math.min(limit, maxLimit);
};

module.exports = { validateLimit };
