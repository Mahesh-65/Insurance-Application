const jwt = require('jsonwebtoken');
const env = require('../config/env');

const createToken = (payload) => jwt.sign(payload, env.jwtSecret, { expiresIn: '7d' });

module.exports = createToken;
