const express = require("express");
const router = express.Router();

const {
  getAllPictures,
  addCommentToPost,
  postNewPicture,
  deleteImage
} = require("../controllers/PicturesController");

router.get("/", getAllPictures);
router.post("/post_comment", addCommentToPost);
router.post("/create_picture", postNewPicture);
router.delete("/delete_image/:image_id", deleteImage)

module.exports = router;
