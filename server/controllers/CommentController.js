const Comment = require("../models/CommentModel");

const addCommentToPost = async (req, res) => {
  console.log("aaaa", req.body.payload);
  try {
    console.log("ddddd");
    const postComment = await Comment.create(req.body.payload);
    res.status(200).json({ postComment });
  } catch (err) {
    res.status(404).json({ msg: "Failed" });
  }
};

const getSinglePostComments = async (req, res) => {
  const {blogId} = req.params
  console.log("req params value is", blogId)
  try {
    const postComment = await Comment.find({blogId, commentOn: "blog"})
    res.status(200).json({ postComment });
  } catch (error) {
    res.status(404).json({ msg: "Failed" });
  }
};

module.exports = {
  addCommentToPost,
  getSinglePostComments
};
