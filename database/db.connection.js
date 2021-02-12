const mongoose = require("mongoose");

function dataBaseConnection(url) {
  mongoose.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    () => {
      console.log("Connected Successfully!");
    }
  );
}

module.exports = dataBaseConnection;
