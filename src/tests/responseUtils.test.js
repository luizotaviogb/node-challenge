const { sendResponse } = require('../utils/responseUtils');

describe('sendResponse', () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send a success response with only status, success, and message', () => {
    const status = 200;
    const success = true;
    const message = 'Operation completed successfully';

    sendResponse(res, status, success, message);

    expect(res.status).toHaveBeenCalledWith(status);
    expect(res.json).toHaveBeenCalledWith({
      success,
      message,
    });
  });

  it('should include data in the response when provided', () => {
    const status = 201;
    const success = true;
    const message = 'Resource created';
    const data = { id: 1, name: 'Test' };

    sendResponse(res, status, success, message, data);

    expect(res.status).toHaveBeenCalledWith(status);
    expect(res.json).toHaveBeenCalledWith({
      success,
      message,
      data,
    });
  });

  it('should include error in the response when provided', () => {
    const status = 400;
    const success = false;
    const message = 'Bad request';
    const error = { code: 'INVALID_INPUT', details: 'Invalid data' };

    sendResponse(res, status, success, message, null, error);

    expect(res.status).toHaveBeenCalledWith(status);
    expect(res.json).toHaveBeenCalledWith({
      success,
      message,
      error,
    });
  });

  it('should include both data and error when both are provided', () => {
    const status = 500;
    const success = false;
    const message = 'Server error';
    const data = { partial: 'data' };
    const error = { code: 'SERVER_ERROR' };

    sendResponse(res, status, success, message, data, error);

    expect(res.status).toHaveBeenCalledWith(status);
    expect(res.json).toHaveBeenCalledWith({
      success,
      message,
      data,
      error,
    });
  });

  it('should exclude data and error when both are null', () => {
    const status = 204;
    const success = true;
    const message = 'No content';

    sendResponse(res, status, success, message, null, null);

    expect(res.status).toHaveBeenCalledWith(status);
    expect(res.json).toHaveBeenCalledWith({
      success,
      message,
    });
  });
});
