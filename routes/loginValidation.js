const Joi = require("@hapi/joi");

const loginValidation = (data) => {
  const validationSchema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(8).required().max(1024),
  });
  return validationSchema.validate(data);
};

module.exports = loginValidation;
