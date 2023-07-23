const express = require("express")
const router = express.Router()

const {getSingleBlog} = require("../controllers/BlogController")

router.get("/:blog_id", getSingleBlog)

module.exports = router;