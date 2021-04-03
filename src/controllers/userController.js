const db = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateLogin } = require("../../handlers/validation.js");

exports.getUsers = async (req, res) => {
  const user = await db.User.find({});
  if (!user)
    return res.status(404).json({
      error: "Users not found!"
    });

  return res.status(200).json(user);
};

exports.signup = async (req, res) => {
  //validation

  //checking if username already exist.
  const isUsernameExist = await db.User.findOne({
    username: req.body.username
  });

  if (isUsernameExist) {
    return res.status(400).json({
      username: "Handle already taken Please use another Handle."
    });
  }

  //check if the user email already exist
  const isUserExist = await db.User.findOne({ email: req.body.email });
  if (isUserExist) {
    return res.status(401).json({
      email: "Email address already taken!"
    });
  }

  //varify if two password match
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
      password: "Your password doesn't match"
    });
  }

  //encrypt the password
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  //create the user if not exist
  const newUser = new db.User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  });

  const user = await db.User.create(newUser);

  if (!user) {
    return res.status(500).json({
      error: "Something went wrong please try again!"
    });
  }

  return res.status(201).json({
    message: `User ${user._id} is created Successfully!`
  });
};

//Login user route
exports.signin = async (req, res) => {
  const errors = [];
  //validation
  const { error } = validateLogin(req.body);

  // res.status(400).json(error.details[0].message);
  if (error) {
    //eslint-disable-next-line
    if (error.details[0].message === '"password" is not allowed to be empty')
      errors.push({
        password: "Password field must not be empty."
      });

    if (
      error.details[0].message ===
      //eslint-disable-next-line
      '"password" length must be at least 6 characters long'
    ) {
      errors.push({
        password: "Password must be 6 characters long"
      });
    }

    //eslint-disable-next-line
    if (error.details[0].message === '"password" Incorrrect password') {
      errors.push({ password: "Incorrect Password" });
    }

    //eslint-disable-next-line
    if (error.details[0].message === '"email" must be a valid email') {
      errors.push({
        email: "Email must be a valid email address."
      });
    } else if (
      //eslint-disable-next-line
      error.details[0].message === '"email" is not allowed to be empty'
    ) {
      errors.push({ email: "Email field must not be empty." });
    }

    return res.status(400).json({
      errors
    });
  }

  //find the user in the database
  const userFound = await db.User.findOne({ email: req.body.email });
  if (!userFound) {
    return res
      .status(400)
      .json(
        errors.push({ email: `Oops user ${req.body.email} doesn't exist!` })
      );
  }

  //compare passwords
  const isValid = await bcrypt.compare(req.body.password, userFound.password);
  if (!isValid) {
    return res
      .status(400)
      .json(errors.push({ password: "Incorrect password" }));
  }

  const payload = {
    userId: userFound._id,
    username: userFound.username,
    profilePic: userFound.profilePic
  };

  // sent the token
  //eslint-disable-next-line
  const token = await jwt.sign(payload, process.env.SECRET_KEY);

  req.headers.authorization = token;

  //change user status
  await db.User.updateOne({ _id: userFound._id }, { status: "online" });

  res.status(200).json({ token });
};

//update user info
exports.updateUser = async (req, res) => {
  //validation

  const newUser = new db.User({
    _id: req.headers.userId,
    username: req.body.username,
    email: req.body.email,
    bio: req.body.bio,
    profilePic: req.body.profilePic,
    status: req.body.status
  });

  const updatedUser = await db.User.findOneAndUpdate(
    { _id: req.headers.userId },
    newUser,
    {
      new: true,
      runValidators: true,
      context: "query"
    }
  );

  if (!updatedUser) {
    return res.status(500).json({
      error: "something wrong please try again!"
    });
  }
  //fetch all the user data
  return res.status(200).json({
    message: `${req.headers.username} info is updated successfully!`
  });
};

// Get loggedin User info
exports.getLoggedInUser = async (req, res) => {
  const user = await db.User.findById({ _id: req.headers.userId });
  if (!user) {
    return res.status(404).json({
      error: "User not found"
    });
  }

  return res.status(200).json(user);
};

//get single user details
exports.getSingleUser = async (req, res) => {
  const user = await db.User.findById({ _id: req.params._id });
  if (!user) {
    return res.status(400).json({
      error: "Oops user doesn't exits"
    });
  }

  return res.status(200).json(user);
};
