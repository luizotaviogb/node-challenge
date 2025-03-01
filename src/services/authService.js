const User = require('../models/User');
const jwtUtils = require('../utils/jwtUtils');
const bcrypt = require('bcrypt');

/**
 * Authenticate a user by checking their login and password.
 * @param {string} login - The user's login (username or email).
 * @param {string} password - The user's password.
 * @returns {Object} - An object containing the JWT token if authentication is successful.
 * @throws {Error} - Throws an error if the credentials are invalid.
 */
const authenticate = async (login, password) => {
  const user = await User.findOne({ login });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }

  const token = jwtUtils.generateToken(user._id);
  return { token };
};

/**
 * Save a new user to the database.
 * @param {string} login - The user's login (username).
 * @param {string} password - The user's password.
 * @returns {Object} - An object containing the saved user's login.
 */
const save = async (login, password) => {
  const user = new User({ login, password });
  await user.save();
  return { login: user.login };
};

module.exports = {
  authenticate,
  save,
};
