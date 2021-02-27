const db = require("../models");

exports.createChannel = async (req, res) => {
  // validate the data
  const channel = await db.Channel.create({
    name: req.body.name,
    members: req.body.members,
    user: req.headers.userId,
    visibility: req.body.visibility,
    description: req.body.description
  });

  if (!channel)
    return res.status(500).json({
      error: "something went wrong"
    });

  res.status(200).json({
    message: "channel created successfully!"
  });
};

// get all the channels for a specific user
exports.userChannels = async (req, res) => {
  //check if the userId is equal to the user who created the channel
  const channels = await db.Channel.find({})
    .where("user")
    .equals(req.headers.userId)
    .populate("user");

  if (!channels)
    return res.status(404).json({
      error: "Channel not found"
    });

  return res.status(200).json(channels);
};
