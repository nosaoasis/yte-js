const express = require("express");
const router = express.Router();

const {
  createQuote,
  getAllQuotes,
  getLastQuotes,
  deleteQuote
} = require("../controllers/QuoteController");
const {adminUserAuthenticateMiddleware} = require("../middleware/authenticate")

router.get("/", getAllQuotes)
router.get("/last_quote", getLastQuotes)
router.post("/create", adminUserAuthenticateMiddleware, createQuote);
router.delete("/delete/:id", adminUserAuthenticateMiddleware, deleteQuote);

module.exports = router;
