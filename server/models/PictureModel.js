const mongoose = require("mongoose");

const PictureModel = new mongoose.Schema(
  {
    imageLink: { 
      type: String, 
      require: [true, "Please upload an image"]
    },
    title: {
      type: String,
      require: [true, "Enter a title for your blog"],
      maxlength: 200,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PictureModel", PictureModel);
