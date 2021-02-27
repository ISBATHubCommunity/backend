const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
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
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [{ type: String, trim: true }],
  visibility: {
    type: String,
    default: "public",
    required: true
  },
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Channel", channelSchema);
