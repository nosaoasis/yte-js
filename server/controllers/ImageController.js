const Images = require("../models/ImageModel")

const uploadBlogPostImage = async (req, res) => {
  console.log("image path value is ", req.file.path)
  const imageUpload = new Images({
    image: req.file.path
  })
  console.log("==================", imageUpload)

  try {
    await imageUpload.save()
    return res.status(201).json(imageUpload)
  } catch (error) {
    return res.status(400).json({
      msg: `image upload failed, check to see ${error}`,
      status: "error"
    })
  }
}

module.exports = {
  uploadBlogPostImage
}