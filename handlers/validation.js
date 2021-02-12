const Joi = require("joi");

exports.validateLogin = data => {
  const loginSchema = Joi.object({
    email: Joi.string()
      .required()
      .trim()
      .strip()
      .email()
      .empty(),
    password: Joi.string()
      .strip()
      .required()
      .min(6)
      .max(30)
      .trim()
      .pattern(new RegExp(/^[a-zA-Z0-9!@#$%&*]{3,25}$/))
  });

  return loginSchema.validate(data);
};

exports.loginErrorHandle = async error => {
  if (error) {
    const errors = [];
    switch (error.details[0].message) {
      //password errors
      case '"password" is not allowed to be empty':
        errors.push({ password: "Password field must not be empty." });

      case '"password" length must be at least 6 characters long':
        errors.push({ password: "Password must be 6 characters long" });

      // Email errors
      case '"email" must be a valid email':
        errors.push({ email: "Email must be a valid email address." });

      case '"email" is not allowed to be empty':
        errors.push({ email: "Email field must not be empty." });

      default:
        return errors;
    }
  }
};
