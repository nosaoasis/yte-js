const express = require("express")
const router = express.Router()

const {addCommentToPost, getSinglePostComments} = require("../controllers/CommentController")

router.post("/post_comment", addCommentToPost)
router.get("/post_comments/:blogId", getSinglePostComments)

module.exports = router