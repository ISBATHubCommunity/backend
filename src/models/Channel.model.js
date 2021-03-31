const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 100
    },
    description: {
      type: String,
      trim: true
    },
    identifier: {
      type: Number
    },
    visibility: {
      type: String,
      default: "public",
      required: true
    },
    user: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Channel", channelSchema);
