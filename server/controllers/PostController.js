const Posts = require("../models/PostModel")

const createPost = async (req, res) => {
  // const {post_content} = req.body
  console.log(req.body)
  const post = await Posts.create(req.body)

  res.status(201).json(post)
}

const getAllPosts = async (req, res) => {
  const posts = await Posts.find({})
  res.status(200).json({posts})
}

const createPostAndPublish = (req, res) => {
  console.log(req.body)
  res.json({msg: `post will be created and published`})
}

module.exports = {
  createPost,
  getAllPosts,
  createPostAndPublish
}