const jwt = require('jsonwebtoken');
const { generateToken, verifyToken } = require('../utils/jwtUtils');

jest.mock('jsonwebtoken');

describe('jwtUtils', () => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const userId = '123';

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateToken', () => {
    it('should generate a valid JWT for a given user ID', () => {
      const mockToken = 'fakeToken';
      jwt.sign.mockReturnValue(mockToken);

      const token = generateToken(userId);

      expect(token).toBe(mockToken);
      expect(jwt.sign).toHaveBeenCalledWith({ id: userId }, JWT_SECRET, {
        expiresIn: '1h',
      });
    });
  });

  describe('verifyToken', () => {
    it('should return the payload if the token is valid', () => {
      const mockPayload = { id: userId };
      jwt.verify.mockReturnValue(mockPayload);

      const payload = verifyToken('validToken');

      expect(payload).toEqual(mockPayload);
      expect(jwt.verify).toHaveBeenCalledWith('validToken', JWT_SECRET);
    });

    it('should throw an error if the token is invalid', () => {
      jwt.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      expect(() => verifyToken('invalidToken')).toThrow(
        'Invalid or expired token',
      );
      expect(jwt.verify).toHaveBeenCalledWith('invalidToken', JWT_SECRET);
    });

    it('should throw an error if the token is expired', () => {
      jwt.verify.mockImplementation(() => {
        throw new jwt.TokenExpiredError('Token expired', new Date());
      });

      expect(() => verifyToken('expiredToken')).toThrow(
        'Invalid or expired token',
      );
      expect(jwt.verify).toHaveBeenCalledWith('expiredToken', JWT_SECRET);
    });
  });
});
