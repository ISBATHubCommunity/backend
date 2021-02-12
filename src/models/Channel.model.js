const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, min: 3, max: 100 },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Channel", channelSchema);
