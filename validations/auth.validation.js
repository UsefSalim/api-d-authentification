const Joi = require('@hapi/joi');

exports.registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(50),
    email: Joi.string().required().email().min(6).max(255),
    password: Joi.string().required().min(5).max(1024),
  });

  return schema.validate(data);
};
exports.loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email().min(6).max(255),
    password: Joi.string().required().min(5).max(1024),
  });

  return schema.validate(data);
};

