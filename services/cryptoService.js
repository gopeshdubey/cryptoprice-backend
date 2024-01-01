const { errorResponseHandler, badRequestHandler } = require("../utils/errors");
const { INTERNAL_SERVER_ERROR, OK } = require("../utils/httpStatus");
const {
  fetchAllSupportedCurrencies,
  fetchTopCryptos,
  fetchCryptoPrice,
} = require("./coinMarketCapService");
const { validateCryptoPriceData } = require("../validations/cryptoValidation");

// fetches crypto list & its supported currencies
const fetchCryptoList = async (req) => {
  const response = {
    data: null,
    message: "",
    httpStatus: INTERNAL_SERVER_ERROR,
    error: null,
  };

  try {
    // fetch supported currencies
    const supportedCurrencies = await fetchAllSupportedCurrencies();

    if (!supportedCurrencies) {
      response.httpStatus = INTERNAL_SERVER_ERROR;
      response.error = "Failed to fetch supported currencies";
      response.message = "Failed to fetch crypto list!";
      return response;
    }

    // fetch top 100 cryptos
    const cryptoList = await fetchTopCryptos();

    if (!cryptoList) {
      response.httpStatus = INTERNAL_SERVER_ERROR;
      response.error = response.message = "Failed to fetch crypto list!";
      return response;
    }

    // modify crypto list and add supported currencies
    const cryptoData = cryptoList.map((data) => {
      data.currencies = supportedCurrencies;
      return data;
    });

    response.data = cryptoData;
    response.httpStatus = OK;
    response.message = "Crypto list fetched successfully!";
  } catch (error) {
    errorResponseHandler(response, error);
  }

  return response;
};

// fetches crypto price
const fetchCryptoAmountPrice = async (req) => {
  const response = {
    data: null,
    message: "",
    httpStatus: INTERNAL_SERVER_ERROR,
    error: null,
  };

  try {
    const { sourceCrypto, amount, targetCurrency } = req.body;

    const validationResult = await validateCryptoPriceData(req.body);

    // return if invalid data found
    if (validationResult.error) {
      badRequestHandler(
        response,
        validationResult.error,
        "Failed to fetch price!"
      );
      return response;
    }

    // fetch price of token in specific currency
    const cryptoPrice = await fetchCryptoPrice(sourceCrypto, targetCurrency);

    if (!cryptoPrice) {
      response.httpStatus = INTERNAL_SERVER_ERROR;
      response.error = response.message = "Failed to fetch crypto price!";
      return response;
    }

    const price = (Number(cryptoPrice) * Number(amount)).toFixed(10);

    response.data = {
      price: price,
    };
    response.httpStatus = OK;
    response.message = "Crypto price fetched successfully!";
  } catch (error) {
    errorResponseHandler(response, error);
  }

  return response;
};

module.exports = { fetchCryptoList, fetchCryptoAmountPrice };
