const mongoose = require("mongoose")

const QuoteSchema = new mongoose.Schema({
  quote_body: {
    type: String,
    required: [true, "Your blog cannot be empty"]
  },
  published: {
    type: Boolean,
    default: true
  }
}, {timestamps: true})

module.exports = mongoose.model("Quotes", QuoteSchema)