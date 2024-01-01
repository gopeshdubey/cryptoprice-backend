const {
  fetchCryptoList,
  fetchCryptoAmountPrice,
} = require("../services/cryptoService");

const fetchCryptos = async (req, res) => {
  const response = await fetchCryptoList(req);
  res.status(response.httpStatus).json(response);
};

const fetchPrice = async (req, res) => {
  const response = await fetchCryptoAmountPrice(req);
  res.status(response.httpStatus).json(response);
};

module.exports = { fetchCryptos, fetchPrice };
