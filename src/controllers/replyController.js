const db = require("../models");

exports.reply = async (req, res) => {
  //validation

  const reply = new db.Reply({
    body: req.body.body,
    user: req.headers.userId,
    post: req.params.postId
  });

  const savedReply = await reply.save();

  if (!savedReply) {
    return res.status(500).json({
      error: "something went wrong please try again!"
    });
  }

  return res.status(201).json({
    message: `replying on ${req.params.postId} was successful`
  });
};

//get all reply for a specific post
exports.getAllPostReply = async (req, res) => {
  //check if the post id is equal to the reply post id
  const replies = await db.Reply.find()
    .populate("user")
    .populate("post");

  replies.map(replies => {
    console.log(replies.post._id);
  });
};
