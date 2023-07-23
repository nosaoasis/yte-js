const Posts = require("../models/PostModel");

const getSingleBlog = async (req, res) => {
  const {blog_id} = req.params
  // console.log("req params blog id value is", blog_id)
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