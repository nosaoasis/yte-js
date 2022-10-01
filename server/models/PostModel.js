const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
  imageLink: {
    type: String,
    require: [true, "Please upload an image"]
  },
  title: {
    type: String,
    require: [true, "Enter a title for your blog"],
    maxlength: 200
  },
  post_body: {
    type: String,
    required: [true, "Your blog cannot be empty"]
  },
  published: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})

module.exports = mongoose.model("Posts", PostSchema)