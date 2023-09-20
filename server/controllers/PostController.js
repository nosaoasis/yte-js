const Posts = require("../models/PostModel");

const createPost = async (req, res) => {
  const post = await Posts.create(req.body);

  res.status(201).json(post);
};

const getAllPosts = async (req, res) => {
  try {
    let query = Posts.find();
    
    const page = parseInt(req.params.page !== null ? req.params.page : 1);
    const pageLimit = 10;
    const skip = (page - 1) * pageLimit;
    const total = await Posts.countDocuments();
    
    const pages = Math.ceil(total / pageLimit);
    
    query = query.skip(skip).limit(pageLimit);
    if (page > pages) {
      return res.status(404).json({ msg: "Failed" });
    }
    const posts = await query.sort({$natural: -1});

    res
      .status(200)
      .json({ msg: "Success", posts, nbHits: posts.length, page, pages });
  } catch (error) {
    res.status(404).json({ msg: "Failed" });
  }
};

const getAllPostsClientSide = async (req, res) => {
  try {
    const allClientSidePosts = await Posts.find({})
    res
      .status(200)
      .json({ msg: "Success", posts: allClientSidePosts, nbHits: allClientSidePosts.length});
  } catch (error) {
    res.status(404).json({ msg: "Failed" });
  }
}

const getSinglePost = async (req, res) => {
  const { post_id } = req.params;
  const singlePost = await Posts.findOne({ _id: post_id });
  if (!singlePost) {
    res.status(404).json({ msg: "Failed" });
    return;
  }
  res.status(200).json({ msg: "Success", post: singlePost });
};

const publishUnpublishPost = async (req, res) => {
  const { id, published } = req.body;
  const post = await Posts.findByIdAndUpdate({ _id: id }, {published}, {
    new: true,
  });
  if (!post) {
    return res.status(500).json({ msg: "Error updating post" });
  }
  return res.status(200).json({ msg: "Successfully updated post", post });
};

const searchPost = async (req, res) => {
  const {searchString} = req.body
  const post = await Posts.find({"title": {'$regex': searchString}})
  res.status(200).json({ msg: "Success", post });
};

const deletePost = async (req, res) => {
  const {post_id} = req.body
  const post = await Posts.findByIdAndRemove({_id : post_id})
  if (!post) {
    return res.status(500).json({ msg: "Error deleting post" })
  }
  return res.status(200).json({ msg: "Successfully deleted post" });
}

const updatePost = async (req, res) => {
  const {post_id} = req.params
  const {published, postTitle, customEdContent, imageLink} = req.body
  const updateContent = {
    imageLink,
    title: postTitle,
    post_body: customEdContent
  }
  const post = await Posts.findByIdAndUpdate({ _id: post_id }, updateContent, {
    new: true,
  });
  if (!post) {
    return res.status(500).json({ msg: "Error updating post" });
  }
  return res.status(200).json({ msg: "Successfully updated post", post });
}

module.exports = {
  createPost,
  getAllPosts,
  getSinglePost,
  publishUnpublishPost,
  searchPost,
  deletePost,
  updatePost,
  getAllPostsClientSide
};
