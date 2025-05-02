const authService = require('../services/auth.service');
const { success, error } = require('../utils/response');

exports.register = async (request, reply) => {
  const {name, email, password } = request.body;

  if (!email || !password) {
    return error(reply, 'Email and password are required', 400);
  }

  const existing = await authService.findUserByEmail?.(email); // optional chaining if extended
  if (existing) {
    return error(reply, 'User already exists', 409);
  }

  const user = await authService.createUser({ name, email, password });
  return success(reply, { id: user._id, email: user.email }, 'User registered');
};

exports.login = async (request, reply) => {
  const { email, password } = request.body;

  const user = await authService.validateUser({ email, password });
  if (!user) return error(reply, 'Invalid credentials', 401);

  const token = request.server.jwt.sign({ id: user._id, email: user.email });
  return success(reply, { token }, 'Login successful');
};

exports.getProfile = async (request, reply) => {
  const user = await authService.findUserById(request.user.id);
  if (!user) return error(reply, 'User not found', 404);

  return success(reply, user);
};
