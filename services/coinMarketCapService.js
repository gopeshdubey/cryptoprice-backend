const axios = require("axios").default;

const apiEndpoints = {
  supportedCurrenciesUrl:
    "https://api.coingecko.com/api/v3/simple/supported_vs_currencies",
  topCryptos:
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h&locale=en",
  cryptoPrice: "https://api.coingecko.com/api/v3/simple/price",
};

const fetchAllSupportedCurrencies = async () => {
  try {
    const headers = {
      "X-CMC_PRO_API_KEY": process.env.COIN_MARKET_CAP_KEY,
    };

    const { data } = await axios.get(apiEndpoints.supportedCurrenciesUrl, {
      headers: headers,
    });

    if (data && data.length) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error in fetching supported currencies : ", error);
    return null;
  }
};

const fetchTopCryptos = async () => {
  try {
    const headers = {
      "X-CMC_PRO_API_KEY": process.env.COIN_MARKET_CAP_KEY,
    };

    // by default it fetches top 100 crypto, sorted based on market cap
    const { data } = await axios.get(`${apiEndpoints.topCryptos}`, {
      headers: headers,
    });

    if (data && data.length) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error in fetching top 100 cryptos : ", error);
    return null;
  }
};

const fetchCryptoPrice = async (cryptoId, currencyId) => {
  try {
    const headers = {
      "X-CMC_PRO_API_KEY": process.env.COIN_MARKET_CAP_KEY,
    };

    // fetches price in specific currency
    const { data } = await axios.get(
      `${apiEndpoints.cryptoPrice}?ids=${cryptoId}&vs_currencies=${currencyId}`,
      {
        headers: headers,
      }
    );

    if (data) {
      return data[`${cryptoId}`][`${currencyId}`];
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error in fetching top 100 cryptos : ", error);
    return null;
  }
};

module.exports = {
  fetchAllSupportedCurrencies,
  fetchTopCryptos,
  fetchCryptoPrice,
};
