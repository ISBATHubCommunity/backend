const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config(".env");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const jwt = require("jsonwebtoken");
const errorHandlers = require("./handlers/errorHandling");
const routes = require("./src/routes/routes");
const dataBaseConnection = require("./database/db.connection");

// socket io
io.use((socket, next) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    // eslint-disable-next-line consistent-return
    jwt.verify(socket.handshake.query.token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) return next(new Error({ AuthenticationError: "Authentication error, invalid Token" }));
      // eslint-disable-next-line no-param-reassign
      socket.decoded = decoded;
      next();
    });
  } else {
    next(new Error({ AuthenticationError: "Your are unauthenticated" }));
  }
}).on("connection", (socket) => {
  // Connection now authenticated to receive further events
  console.log("User connected");
  socket.on("chat-message", (message) => {
    io.emit("chat-message", message);
  });
});

// io.on("connection", (socket) => {
//   console.log("User connected");
//   socket.emit("chat-message", "Hello there?");
// });

// application middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connection to the database.
dataBaseConnection(process.env.DB_CONNECTION);

// application main route
app.use("/", routes);

const PORT = process.env.PORT || 3300;
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
