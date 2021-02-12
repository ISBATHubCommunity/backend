const db = require("../models/index");

exports.createPost = async (req, res) => {
  //validation

  const newPost = new db.Post({
    body: req.body.body,
    user: req.headers.userId
  });

  const post = await db.Post.create(newPost);
  if (!post) {
    return res.status(500).json({ error: "something went wrong" });
  }

  return res
    .status(201)
    .json({ message: "Post created Successfully!", postId: post._id });
};

//get all posts
exports.getPosts = async (req, res) => {
  const posts = await db.Post.find()
    .populate("user", ["username", "email", "profilePic", "createdAt", "bio"])
    .sort({ createdAt: -1 });
  if (!posts)
    return res.status(404).json({
      error: "posts not found!"
    });

  res.status(200).json(posts);
};

//get single Post
exports.getPost = async (req, res) => {
  const post = await db.Post.findById({ _id: req.params._id }).populate(
    "user",
    ["username", "email", "profilePic", "createdAt", "bio"]
  );
  if (!post) {
    return res.status(500).json({
      error: "something went wrong"
    });
  }

  return res.status(200).json(post);
};
