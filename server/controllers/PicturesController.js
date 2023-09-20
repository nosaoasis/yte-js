const Pictures = require("../models/PictureModel")

const getAllPictures = async (req, res) => {
  try {
    const allPictures = await Pictures.find({}).sort({$natural: -1});
    res.status(200).json({ allPictures });
  } catch (error) {
    console.log("An error occured", error)
  }
}

const addCommentToPost = async (req, res) => {
  
}

const postNewPicture = async (req, res) => {
  try {
    const newPicture = await Pictures.create(req.body)
    res.status(201).json(newPicture);
  } catch (error) {
    console.log("An error occured when attempting to post a new picture to the server.")
  }
}

const deleteImage = async (req, res) => {
  const {image_id} = req.params
  try {
    const delImage = await Pictures.findByIdAndRemove({_id : image_id})
    if (!delImage) {
      return res.status(500).json({ msg: "Error deleting image" })
    }
    return res.status(202).json({ msg: "Successfully deleted image" });
  } catch (error) {
    console.log("An error occured when attempting to post a new picture to the server.")
  }
}

module.exports = {
  getAllPictures,
  addCommentToPost,
  postNewPicture,
  deleteImage
};