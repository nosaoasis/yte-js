const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
  blogId: {
    type: String,
    require: [true, "You require a post id value"]
  },
  commentOn: {
    type: String,
    default: "blog"
  },
  firstname: {
    type: String,
    require: [true, "Please add your first name"]
  },
  lastname: {
    type: String,
    require: [true, "Please add your last name"]
  },
  email: {
    type:String,
    require:[true, "Please enter an email"],
    minlength: 3,
    maxlength:50,
    match:[
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please provide a valid email address"
    ],
    unique: true
  },
  comment: {
    type: String,
    require: [true, "Please add your comment"]
  }
}, {timestamps: true})

module.exports = mongoose.model("Comments", CommentSchema)