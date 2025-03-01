const validateRequiredFields = require('../middlewares/requestsMiddleware');
const { sendResponse } = require('../utils/responseUtils');

jest.mock('../utils/responseUtils', () => ({
  sendResponse: jest.fn(),
}));

describe('validateRequiredFields', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();

    jest.clearAllMocks();
  });

  it('should call sendResponse with 400 if required fields are missing', () => {
    const requiredFields = ['name', 'email'];
    req.body = { name: 'John' };

    const middleware = validateRequiredFields(requiredFields);
    middleware(req, res, next);

    expect(sendResponse).toHaveBeenCalledWith(
      res,
      400,
      false,
      'Missing required fields: email',
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should call sendResponse with 400 if multiple required fields are missing', () => {
    const requiredFields = ['name', 'email', 'age'];
    req.body = { name: 'John' };

    const middleware = validateRequiredFields(requiredFields);
    middleware(req, res, next);

    expect(sendResponse).toHaveBeenCalledWith(
      res,
      400,
      false,
      'Missing required fields: email, age',
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if all required fields are present', () => {
    const requiredFields = ['name', 'email'];
    req.body = { name: 'John', email: 'john@example.com' };

    const middleware = validateRequiredFields(requiredFields);
    middleware(req, res, next);

    expect(sendResponse).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should call next if requiredFields is empty', () => {
    const requiredFields = [];
    req.body = {};

    const middleware = validateRequiredFields(requiredFields);
    middleware(req, res, next);

    expect(sendResponse).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('should handle falsy values correctly and call sendResponse', () => {
    const requiredFields = ['name', 'email'];
    req.body = { name: '', email: null };

    const middleware = validateRequiredFields(requiredFields);
    middleware(req, res, next);

    expect(sendResponse).toHaveBeenCalledWith(
      res,
      400,
      false,
      'Missing required fields: name, email',
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should throw an error if requiredFields is not an array', () => {
    const invalidInputs = [
      null,
      undefined,
      42,
      'not-an-array',
      { obj: 'invalid' },
    ];

    invalidInputs.forEach((invalidInput) => {
      expect(() => validateRequiredFields(invalidInput)).toThrow(
        'requiredFields must be an array',
      );
    });
  });
});
