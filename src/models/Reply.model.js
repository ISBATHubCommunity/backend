const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  body: { type: String, required: true, trim: true },
  like: { type: Number, default: 0 },
  unLike: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  userHandle: { type: String, trim: true, required: true },
  userProfilePic: { type: String, trim: true, required: true }
});

module.exports = mongoose.model("Reply", replySchema);
