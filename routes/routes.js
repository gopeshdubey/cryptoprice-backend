const { cryptoRouter } = require("./crypto");
const express = require("express");
const routes = express();

routes.use("/crypto", cryptoRouter);

module.exports = { routes };
