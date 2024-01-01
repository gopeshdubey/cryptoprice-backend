const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = require("./httpStatus");

const errorResponseHandler = (response, error) => {
  response.data = null;
  response.message = "Internal Server Error";
  response.httpStatus = INTERNAL_SERVER_ERROR;
  response.error = error.toString();
};

const badRequestHandler = (response, error, message) => {
  response.httpStatus = BAD_REQUEST;
  response.error = error.toString();
  response.message = message;
};

module.exports = { errorResponseHandler, badRequestHandler };
