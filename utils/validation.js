const Joi = require('joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(3).required(),
    signupPhoneNo: Joi.string().pattern(/^[0-9]{10}$/).required(),
    signupEmailId: Joi.string().email().required(),
    signupPassword: Joi.string().min(6).required(),
    signupConfirmPasaword: Joi.ref('signupPassword'),
  }).with('signupPassword', 'signupConfirmPasaword');

  return schema.validate(data);
};

module.exports = { registerValidation };