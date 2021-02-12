const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
require("dotenv").config(".env");

const routes = require("./src/routes/routes");

app.use(cors());
app.use(helmet());
app.use(express.json());

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => {
    console.log("Connected Successfully!");
  }
);

app.use("/", routes);

// eslint-disable-next-line
const PORT = process.env.PORT || 3300;

//eslint-disable-next-line
const host = process.env.host || "localhost:";

app.listen(PORT, () => {
  console.log(`Server is up on http://${host}${PORT}`);
});
