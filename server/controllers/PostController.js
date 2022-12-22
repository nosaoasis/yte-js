const Posts = require("../models/PostModel");
const { post } = require("../routes/admin_routes");

const createPost = async (req, res) => {
  console.log(req.body);
  const post = await Posts.create(req.body);

  res.status(201).json(post);
};

const getAllPosts = async (req, res) => {
  // console.log("server log value is ", req.params);

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
    const posts = await query;

    res
      .status(200)
      .json({ msg: "Success", posts, nbHits: posts.length, page, pages });
  } catch (error) {
    res.status(404).json({ msg: "Failed" });
  }
  // const posts = await Posts.find({});
  // const paginatedPost = await Posts.find({}).sort({ _id: -1 }).limit(7);

  // const pagination =  req.params.pagination !== null ? req.params.pagination : 1;
  // const pageLimit =  7;
  // const skip = (pagination - 1) * pageLimit;

  // result = posts.skip(skip).limit(pageLimit);

  // console.log("paginatedPost value is ",paginatedPost)
  // res.status(200).json({ products, nbHits: products.length });

  // res.status(200).json({ posts:post.slice(0,pageLimit), nbHits: posts.length > skip ? posts.length : 50 });
};

const getSinglePost = async (req, res) => {
  console.log("success....you arrived here....");
  console.log("request values", req.query);
  const { post_id } = req.params;
  console.log("post Id value is ", post_id);
  const singlePost = await Posts.findOne({ _id: post_id });
  if (!singlePost) {
    console.log("failed in this logic.....");
    res.status(404).json({ msg: "Failed" });
    return;
  }
  console.log("didn't fail");
  res.status(200).json({ msg: "Success", post: singlePost });
};

const createPostAndPublish = (req, res) => {
  console.log(req.body);
  res.json({ msg: `post will be created and published` });
};

const publishUnpublishPost = async (req, res) => {
  console.log(req.body);
  const { id, published } = req.body;
  const post = await Posts.findByIdAndUpdate({ _id: id }, {published}, {
    new: true,
  });
  if (!post) {
    return res.status(500).json({ msg: "Error updating post" });
  }
  console.log("you got to the publish/unpublish post....");
  return res.status(200).json({ msg: "Successfully updated post", post });
};

const searchPost = async (req, res) => {
  console.log("the request body value is ", req.body);
  res.status(200).json({ msg: "Success", response: "response" });
};

module.exports = {
  createPost,
  getAllPosts,
  createPostAndPublish,
  getSinglePost,
  publishUnpublishPost,
  searchPost,
};
