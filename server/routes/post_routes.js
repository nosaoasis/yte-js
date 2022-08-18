const express = require("express")
// const { model } = require("mongoose")
const router = express.Router()

const {createPost, getAllPosts, createPostAndPublish} = require("../controllers/PostController")

router.get('/', getAllPosts)
router.post("/create", createPost)
router.post("/create_and_publish", createPostAndPublish)

module.exports = router