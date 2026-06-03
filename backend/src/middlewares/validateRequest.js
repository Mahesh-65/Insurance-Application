const ApiError = require('../utils/ApiError');

const validateRequest = (schema, key = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[key], { abortEarly: false, stripUnknown: true });
  if (error) {
    return next(new ApiError(400, error.details.map((item) => item.message).join(', ')));
  }
  req[key] = value;
  return next();
};

module.exports = validateRequest;
