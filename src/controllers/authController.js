const authService = require('../services/authService');
const { sendResponse } = require('../utils/responseUtils');

const login = async (req, res) => {
  const { login, password } = req.body;

  try {
    const { token } = await authService.loginUser(login, password);
    sendResponse(res, 200, true, 'Login successful', { token });
  } catch (error) {
    sendResponse(res, 401, false, error.message);
  }
};

const createUser = async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await authService.createUser(login, password);
    sendResponse(res, 201, true, 'User created successfully', user);
  } catch (error) {
    if (error.code === 11000) {
      return sendResponse(res, 409, false, 'Please choose a different login');
    }
    console.error('Error creating user:', error);
    sendResponse(res, 500, false, 'Error creating user', null, error.message);
  }
};

module.exports = {
  login,
  createUser,
};
