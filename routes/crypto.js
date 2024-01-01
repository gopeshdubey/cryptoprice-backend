const {
  fetchCryptos,
  fetchPrice,
} = require("../controllers/cryptoController");
const express = require("express");

const cryptoRouter = express.Router();

// Route to fetch top 100 cryptos with currencies
cryptoRouter.get("/", fetchCryptos);

// Route to fetch crypto price
cryptoRouter.post("/", fetchPrice);

module.exports = { cryptoRouter };
