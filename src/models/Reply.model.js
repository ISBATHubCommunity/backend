const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  body: { type: String, required: true, trim: true },
  like: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Reply", replySchema);
