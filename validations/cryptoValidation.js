const Joi = require("joi");

const validateCryptoPriceData = async (values) => {
  const schema = Joi.object({
    sourceCrypto: Joi.string().min(2).max(10).required(),
    amount: Joi.number().min(0.1).required(),
    targetCurrency: Joi.string().min(2).max(5).required(),
  });

  return schema.validate(values);
};

module.exports = { validateCryptoPriceData };
