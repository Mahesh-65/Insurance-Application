const Joi = require('joi');

const planSchema = Joi.object({
  planName: Joi.string().required(),
  planType: Joi.string().required(),
  description: Joi.string().required(),
  minimumAge: Joi.number().min(0).required(),
  maximumAge: Joi.number().greater(Joi.ref('minimumAge')).required(),
  basePremium: Joi.number().min(0).required(),
  coverageAmount: Joi.number().min(0).required(),
  requiredDocuments: Joi.array().items(Joi.string()).min(1).required(),
  activeStatus: Joi.boolean().default(true)
});

module.exports = {
  planSchema
};
