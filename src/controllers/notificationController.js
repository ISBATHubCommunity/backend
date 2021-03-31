const db = require("../models");

//route to allow users to send join channel request
exports.sendJoinChannelNotificationRequest = async (req, res) => {
  //get the loggedIn user information
  const userLoggedIn_Id = req.headers.userId;
  //fetch all loggedIn userInfo

  try {
    const loggedInUserInfo = await db.User.findOne({ _id: userLoggedIn_Id });
    if (!loggedInUserInfo)
      return res.status(404).json({
        userError: "User not found"
      });
    //TODO
    //get the channel id to join to

    //if user is found
    //create notification

    /**
     * notification object
     * {
        channelId,
        userId
     * }
     */
    const notifyData = db.Notification({
      userId: userLoggedIn_Id
    });

    const savedNotification = await db.Notification.create(notifyData);
    if (!savedNotification)
      return res.status(500).json({
        notificationError: "Notification not created"
      });

    return res.status(200).json(notifyData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      notification: "something went wrong"
    });
  }
};
