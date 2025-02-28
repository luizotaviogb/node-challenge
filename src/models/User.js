const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, 'Login must be at least 3 characters long'],
    maxlength: [50, 'Login cannot be longer than 20 characters'],
  },
  password: {
    type: String,
    required: true,
    minlength: [3, 'Password must be at least 3 characters long'],
    maxlength: [50, 'Password cannot be longer than 50 characters'],
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
