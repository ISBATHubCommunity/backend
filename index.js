const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config(".env");
const dataBaseConnection = require("./database/db.connection");
const routes = require("./src/routes/routes");
const errorHandlers = require("./handlers/errorHandling");
const app = express();
const http = require("http").Server(app);
//eslint-disable-next-line
const io = require("socket.io")(http);

//application middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

//Connection to the database.
//eslint-disable-next-line
dataBaseConnection(process.env.DB_CONNECTION);

//application main route
app.use("/", routes);

// eslint-disable-next-line
const PORT = process.env.PORT || 3300;

//eslint-disable-next-line
const host = process.env.HOST || "localhost:";

// If any of our routes didn't work, then we ganna 404 them and
// forward it to our error handler
app.use(errorHandlers.notFoundErrorHandler);

// If we are in development which we are then print the stack trace if
// there is any otherwise we are good.........
if (app.get("env") === "development") {
  // This will print all the stack trace if there is any.
  app.use(errorHandlers.developmentErrorsHandler);
}

// lets handle the production error  in w
app.use(errorHandlers.productionErrorsHandler);

app.listen(PORT, () => {
  console.log(`Server is up on http://${host}${PORT}`);
});
