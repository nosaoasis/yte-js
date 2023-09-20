const Quotes = require("../models/QuoteModel")

const createQuote = async (req, res) => {
  const quote = await Quotes.create(req.body)
  res.status(201).json(quote);
}

const getAllQuotes = async (req, res) => {
  try {
    const allQuotes = await Quotes.find({})
    res
      .status(200)
      .json({ msg: "Success", quotes: allQuotes, nbHits: allQuotes.length});
  } catch (error) {
    res.status(404).json({ msg: "Failed" });
  }
}
const getLastQuotes = async (req, res) => {
  try {
    const lastQuote = await Quotes.find().sort({_id:-1}) 
    res
      .status(200)
      .json({ msg: "Success", quote: lastQuote[0], nbHits: lastQuote.length});
  } catch (error) {
    res.status(404).json({ msg: "Failed" });
  }
}

const deleteQuote = async (req, res) => {
  const {id} = req.params
  const quote = await Quotes.findByIdAndRemove({_id : id})
  if (!quote) {
    return res.status(500).json({ msg: "Error deleting quote" })
  }
  return res.status(200).json({ msg: "Successfully deleted quote" });

}

module.exports = {
  createQuote,
  getLastQuotes,
  getAllQuotes,
  deleteQuote
}