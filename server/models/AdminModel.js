const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")  
const jwt = require("jsonwebtoken")

const adminSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please provide your firstname"],
    minlength: 3,
    maxlength: 12
  },
  lastname: {
    type: String,
    required: [true, "Please provide your lastname"],
    minlength: 3,
    maxlength: 12
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
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
})

adminSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

adminSchema.methods.createJWT = function(){
  return jwt.sign({_id: this._id, email:this.email}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_PERIOD})
}

adminSchema.methods.comparePassword = async function(loginPassword) {
  const isMatched = await bcrypt.compareSync(loginPassword, this.password)
  return isMatched
}

module.exports = mongoose.model("Admin", adminSchema)