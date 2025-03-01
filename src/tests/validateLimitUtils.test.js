const { validateLimit } = require('../utils/validateLimitUtils');

describe('validateLimit', () => {
  it('should return the limit if it is less than the maxLimit', () => {
    const limit = 50;
    const maxLimit = 100;
    const result = validateLimit(limit, maxLimit);
    expect(result).toBe(50);
  });

  it('should return the maxLimit if the limit exceeds it', () => {
    const limit = 150;
    const maxLimit = 100;
    const result = validateLimit(limit, maxLimit);
    expect(result).toBe(100);
  });

  it('should return the limit if it is equal to the maxLimit', () => {
    const limit = 100;
    const maxLimit = 100;
    const result = validateLimit(limit, maxLimit);
    expect(result).toBe(100);
  });

  it('should use the default maxLimit (100) if no maxLimit is provided', () => {
    const limit = 150;
    const result = validateLimit(limit);
    expect(result).toBe(100);
  });

  it('should handle negative limits by setting default value', () => {
    const limit = -50;
    const maxLimit = 100;
    const result = validateLimit(limit, maxLimit);
    expect(result).toBe(10);
  });

  it('should handle zero by setting default value', () => {
    const limit = 0;
    const maxLimit = 100;
    const result = validateLimit(limit, maxLimit);
    expect(result).toBe(10);
  });

  it('should handle undefined by setting default value', () => {
    const limit = undefined;
    const maxLimit = 100;
    const result = validateLimit(limit, maxLimit);
    expect(result).toBe(10);
  });

  it('should handle null by setting default value', () => {
    const limit = null;
    const maxLimit = 100;
    const result = validateLimit(limit, maxLimit);
    expect(result).toBe(10);
  });

  it('should return the max(limit,100) if maxLimit is undefined', () => {
    const limit = 200;
    const maxLimit = undefined;
    const result = validateLimit(limit, maxLimit);
    expect(result).toBe(100);
  });

  it('should return the max(limit,100) if maxLimit is null', () => {
    const limit = 50;
    const maxLimit = null;
    const result = validateLimit(limit, maxLimit);
    expect(result).toBe(50);
  });

  it('should return the default limit (10) if both limit and maxLimit are undefined', () => {
    const limit = undefined;
    const maxLimit = undefined;
    const result = validateLimit(limit, maxLimit);
    expect(result).toBe(10);
  });

  it('should return the default limit (10) if both limit and maxLimit are null', () => {
    const limit = null;
    const maxLimit = null;
    const result = validateLimit(limit, maxLimit);
    expect(result).toBe(10);
  });
});
