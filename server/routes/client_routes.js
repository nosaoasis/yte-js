const express = require("express");
const router = express.Router();

const {
  // createPost,
  getAllPosts,
} = require("../controllers/ClientController");

router.get("/", getAllPosts);

module.exports = router;
