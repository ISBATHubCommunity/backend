const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  body: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
  like: { type: Number, default: 0 },
  unlike: { type: Number, default: 0 },
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  reply: [{ type: mongoose.Schema.ObjectId, ref: "Reply" }]
});

module.exports = mongoose.model("Post", postSchema);
