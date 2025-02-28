const validateLimit = (limit, maxLimit = 100) => {
  return Math.min(limit, maxLimit);
};

module.exports = { validateLimit };
