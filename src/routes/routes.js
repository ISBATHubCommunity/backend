const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const replyController = require("../controllers/replyController");
const channelController = require("../controllers/channelController");

const { auth } = require("../../middlewares/authentication");

//user routes
router.get("/users", userController.getUsers);
router.get("/user", auth, userController.getLoggedInUser);
router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.put("/user", auth, userController.updateUser);
router.get("/user/:_id", auth, userController.getSingleUser);

// post routes
router.post("/posts", auth, postController.createPost);
router.get("/posts", auth, postController.getPosts);
router.get("/post/:_id", auth, postController.getPost);

//Reply to post routes
router.post("/reply/:postId", auth, replyController.reply);
router.get("/replies/:postId", auth, replyController.getAllPostReply);

//Channel Routes
router.post("/channels", auth, channelController.createChannel);
router.get("/channels", auth, channelController.userChannels);

module.exports = router;
