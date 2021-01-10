const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const validationSchema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required().max(1024),
  });
  return validationSchema.validate(data);
};

module.exports = registerValidation;
