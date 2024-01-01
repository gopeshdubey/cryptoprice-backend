/** Errors from our BACKEND */
const OK = 200; // Request processed successfully, GET REQUEST (send some response data)
const BAD_REQUEST = 400; // request is incomplete or mismatched
const RESOURCE_NOT_FOUND = 404; // resource not found
const INTERNAL_SERVER_ERROR = 500; // some exception occured

module.exports = { OK, BAD_REQUEST, RESOURCE_NOT_FOUND, INTERNAL_SERVER_ERROR };
