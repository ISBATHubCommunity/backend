const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required"],
      unique: [true, "Your username must be unique"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email is required"],
    },
    status: {
      type: String,
      trim: true,
      required: true,
      default: "offline",
    },
    website: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    profilePic: {
      type: String,
      trim: true,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgUNaoFwOOa3sOnMoc8CVUJ65bhS822etxVQ&usqp=CAU",
    },
    resetPasswordToken: { type: String },
    resetPasswordTokenExpire: { type: Date },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
