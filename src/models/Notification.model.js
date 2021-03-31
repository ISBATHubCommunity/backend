const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: {
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

module.exports = mongoose.model("Notification", notificationSchema);
