const express = require("express");
const router = express.Router();

//application controllers
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const replyController = require("../controllers/replyController");
const channelController = require("../controllers/channelController");
const messageController = require("../controllers/messageController");
const { catchErrorsHandler } = require("../../handlers/errorHandling");
//API middlewares
const { auth } = require("../../middlewares/authentication");

//user routes
router.get("/users", auth, catchErrorsHandler(userController.getUsers));
router.get("/user", auth, catchErrorsHandler(userController.getLoggedInUser));
router.post("/signup", catchErrorsHandler(userController.signup));
router.post("/signin", catchErrorsHandler(userController.signin));
router.put("/user", auth, catchErrorsHandler(userController.updateUser));
router.get(
  "/user/:_id",
  auth,
  catchErrorsHandler(userController.getSingleUser)
);
// post routes
router.post("/posts", auth, postController.createPost);
router.get("/posts", auth, postController.getPosts);
router.get("/post/:_id", auth, postController.getPost);
//Reply to post routes
router.post("/reply/:postId", auth, replyController.reply);
router.get("/replies/:postId", auth, replyController.getAllPostReply);
//Channel Routes
router.post(
  "/channels",
  auth,
  catchErrorsHandler(channelController.createChannel)
);
router.get(
  "/channels",
  auth,
  catchErrorsHandler(channelController.userChannels)
);
router.get(
  "/channels/:_id",
  auth,
  catchErrorsHandler(channelController.getChannel)
);
//message routes
router.post(
  "/messages/:channelId",
  auth,
  catchErrorsHandler(messageController.createMessage)
);
router.get(
  "/messages/:channelId",
  auth,
  catchErrorsHandler(messageController.getAllChannelMessages)
);
router.patch(
  "/messages/:messageId",
  auth,
  catchErrorsHandler(messageController.editMessage)
);
router.delete(
  "/messages/:messageId",
  auth,
  catchErrorsHandler(messageController.deleteMessage)
);

//application router
module.exports = router;
