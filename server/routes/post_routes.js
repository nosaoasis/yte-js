const express = require("express");
// const { model } = require("mongoose")
const router = express.Router();

const {
  createPost,
  getAllPosts,
  createPostAndPublish,
  getSinglePost,
  publishUnpublishPost,
  searchPost
} = require("../controllers/PostController");
const {adminUserAuthenticateMiddleware} = require("../middleware/authenticate")

// all routes here will need authentication

router.get("/:page", getAllPosts);
router.post("/create", createPost);
router.post("/create_and_publish", createPostAndPublish);
router.get("/get_single_post/:post_id", getSinglePost);
router.post("/update_publish", publishUnpublishPost)
router.post('/search_post', adminUserAuthenticateMiddleware, searchPost)

module.exports = router;
