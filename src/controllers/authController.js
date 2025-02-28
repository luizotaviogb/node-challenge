const User = require('../models/User');
const jwtUtils = require('../utils/jwtUtils');
const bcrypt = require('bcrypt');
const { sendResponse } = require('../utils/responseUtils');

const login = async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ login });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return sendResponse(res, 401, false, 'Invalid credentials');
  }

  const token = jwtUtils.generateToken(user._id);
  sendResponse(res, 200, true, 'Login successful', { token });
};

const createUser = async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = new User({ login, password });
    await user.save();
    sendResponse(res, 201, true, 'User created successfully', {
      login: user.login,
    });
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
