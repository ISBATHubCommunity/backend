const db = require("../src/models");
const bcrypt = require("bcrypt");

exports.isEmpty = data => {
  if (data === "") return true;
  else return false;
};

exports.validateEmail = email => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

exports.loginValidationChecks = async data => {
  const errors = [];

  const userData = await db.User.findOne({ email: data.email });

  //emails Checks
  if (this.isEmpty(data.email)) {
    errors.push({ email: "Email field is required" });
  } else if (!this.validateEmail(data.email)) {
    errors.push({ email: "Please provide a valid email address." });
  } else if (!userData) {
    errors.push({ email: `Oops user ${data.email} doesn't exist!` });
  }

  //password checks
  if (this.isEmpty(data.password)) {
    errors.push({ password: "password field is required" });
  } else if (data.password.length < 6) {
    errors.push({ password: "Your password must be 6 characters or more." });
  }

  if (userData) {
    const isValid = await bcrypt.compare(data.password, userData.password);
    if (!isValid) {
      errors.push({
        password: "Incorrect password, please provide a valid password"
      });
    }
  }

  return errors;
};
