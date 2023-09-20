const Posts = require("../models/PostModel");

const getAllPosts = async (req, res) => {
  try {
    const allClientSidePosts = await Posts.find({ published: true }).sort({
      $natural: -1,
    });
    res.status(200).json({
      msg: "Success",
      posts: allClientSidePosts,
      nbHits: allClientSidePosts.length,
    });
  } catch (error) {
    res.status(404).json({ msg: "Failed" });
  }
};

module.exports = {
  getAllPosts,
};
