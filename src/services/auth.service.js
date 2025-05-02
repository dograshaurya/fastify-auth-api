const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.createUser = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  return user.save();
};

exports.validateUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
};

exports.findUserById = (id) => {
  return User.findById(id).select('-password');
};
