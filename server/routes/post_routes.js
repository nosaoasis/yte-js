const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getSinglePost,
  publishUnpublishPost,
  searchPost, 
  deletePost,
  updatePost
} = require("../controllers/PostController");
const {adminUserAuthenticateMiddleware} = require("../middleware/authenticate")

// all routes here will need authentication

router.get("/:page", getAllPosts);
router.post("/create", createPost);
router.get("/get_single_post/:post_id", getSinglePost);
router.post("/update_publish", publishUnpublishPost)
router.post('/search_post', adminUserAuthenticateMiddleware, searchPost)
router.post('/delete_post', adminUserAuthenticateMiddleware, deletePost)
router.post('/update_post/:post_id', adminUserAuthenticateMiddleware, updatePost)

module.exports = router;
