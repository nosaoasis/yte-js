const Posts = require("../models/PostModel");

const getSingleBlog = async (req, res) => {
  const {blog_id} = req.params
  const singlePost = await Posts.findOne({ _id: blog_id });
  if (!singlePost) {
    res.status(404).json({ msg: "Failed" });
    return;
  }
  res.status(200).json({ msg: "Success", post: singlePost });
}

module.exports = {
  getSingleBlog
}