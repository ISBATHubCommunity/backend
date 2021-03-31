const db = require("../models/index");
const { ObjectId } = require("mongodb");

exports.createMessage = async (req, res) => {
  //validated the user input
  //get the user id who create this message
  const userId = req.headers.userId;
  //get the channel for which this message belong to.
  const channelId = req.params.channelId;
  // //save the message in the message table.
  const message = new db.Message({
    body: req.body.body,
    user: userId,
    channelId
  });

  const createdMessage = await db.Message.create(message);

  if (!createdMessage) {
    return res.status(400).json({
      messageError: "something went wrong"
    });
  }

  return res.status(201).json(createdMessage);
};

//get all the message belonging to a specific channel
exports.getAllChannelMessages = async (req, res) => {
  //get the request headers
  const channelId = req.params.channelId;

  //send a request to fetch all the data from the database
  try {
    const channelMessages = await db.Message.find({})
      .where("channelId")
      .equals(channelId)
      .populate("user", "username profilePic ");

    if (!channelMessages)
      return res.status(404).json({
        error: "There are no messages for this channel yet"
      });

    //return the fetch data to  the frontend
    return res.status(200).json(channelMessages);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
    console.log(error);
  }
};

//Edit message
exports.editMessage = (req, res) => {
  //first check if the user loggedin is the own of the message.
  const userId = req.headers.userId;
  console.log(userId);
};

//Delete message
exports.deleteMessage = async (req, res) => {
  //first check if the user loggedin is the own of the message.
  const userId = req.headers.userId;
  //get the message id
  const _id = ObjectId(req.params.messageId);

  //query that specific message
  const messageData = await db.Message.findById({ _id });

  if (!messageData) {
    return res.status(400).json({
      error: "Nope no message to delete"
    });
  }
  //checking if the userid in the message response is equal to the user
  //loggedin then good to delete otherwise Nope
  if (JSON.stringify(userId) !== JSON.stringify(messageData.user)) {
    return res.status(400).json({
      deleteMessageError: "you can't delete this message!"
    });
  }

  //now delete the message
  const messageDeleted = await db.Message.findOneAndDelete({ _id });
  if (!messageDeleted)
    return res.status(500).json({
      deleteMessageError: "Oops something went wrong during deletion."
    });

  res.status(200).json({
    message: "Message Deleted successfully."
  });
};
