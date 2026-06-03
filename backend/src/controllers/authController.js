const User = require('../models/User');
const createToken = require('../utils/createToken');
const asyncHandler = require('../middlewares/asyncHandler');
const ApiError = require('../utils/ApiError');
const { createAuditLog } = require('../services/auditService');

const register = asyncHandler(async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    throw new ApiError(409, 'User already exists');
  }

  const user = await User.create(req.body);
  await createAuditLog({
    action: 'User Registration',
    description: `${user.name} registered`,
    performedBy: user._id
  });

  const token = createToken({ id: user._id, role: user.role });
  res.status(201).json({ success: true, token, user });
});

const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select('+password');
  if (!user || !(await user.comparePassword(req.body.password))) {
    throw new ApiError(401, 'Invalid credentials');
  }

  await createAuditLog({
    action: 'User Login',
    description: `${user.email} logged in`,
    performedBy: user._id
  });

  const token = createToken({ id: user._id, role: user.role });
  res.json({ success: true, token, user: user.toJSON() });
});

const profile = asyncHandler(async (req, res) => {
  res.json({ success: true, user: req.user });
});

module.exports = {
  register,
  login,
  profile
};
