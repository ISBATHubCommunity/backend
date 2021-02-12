const mongoose = require("mongoose");

const openSourceProjectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true, min: 10, maxlength: 1000 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("OpenSourceProject", openSourceProjectSchema);
