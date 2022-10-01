const express = require("express")
const router = express.Router()

const { uploadBlogPostImage } = require("../controllers/ImageController")
const parser = require("../middleware/cloudinary.config")

router.post("/post", parser.single("image"), uploadBlogPostImage)

module.exports = router