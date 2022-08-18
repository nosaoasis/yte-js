const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
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