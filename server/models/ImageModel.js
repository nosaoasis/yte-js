const mongoose = require("mongoose")

const ImageSchema = mongoose.Schema({
  image: {
    type: String,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model("Images", ImageSchema)