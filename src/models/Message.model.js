const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      trim: true,
      required: true
    },
    user: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    channelId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Message", messageSchema);
