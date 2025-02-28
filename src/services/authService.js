const User = require('../models/User');
const jwtUtils = require('../utils/jwtUtils');
const bcrypt = require('bcrypt');

const authenticate = async (login, password) => {
  const user = await User.findOne({ login });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }

  const token = jwtUtils.generateToken(user._id);
  return { token };
};

const save = async (login, password) => {
  const user = new User({ login, password });
  await user.save();
  return { login: user.login };
};

module.exports = {
  authenticate,
  save,
};
