const mongoose = require("mongoose");

/**
 @param {String} url -  This is the database connection url
 */

function dataBaseConnection(url) {
  mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    () => {
      console.log("Connected Successfully!");
    },
  );
}

module.exports = dataBaseConnection;
