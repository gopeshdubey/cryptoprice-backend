const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { OK, RESOURCE_NOT_FOUND } = require("./utils/httpStatus");
const { routes } = require("./routes/routes");
dotenv.config();

const app = express();

const PORT = 5000;

// CORS setting
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: OK,
  methods: "GET,PUT,POST,DELETE,PATCH",
};

// handles resource not found
const resourceNotFound = (req, res, next) => {
  res.status(RESOURCE_NOT_FOUND).json({ message: "Resource not found!" });
  next();
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/app", routes);
app.use(resourceNotFound);

app.listen(PORT, async () => {
  try {
    console.log(`Server started & listening on PORT ${PORT}....`);
  } catch (error) {
    console.error(`Failed to start server on port ${PORT} `, error);
  }
});
