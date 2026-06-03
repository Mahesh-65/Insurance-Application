const dotenv = require('dotenv');

dotenv.config();

const nodeEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports =
  nodeEnv === 'production'
    ? require('./production')
    : require('./development');
