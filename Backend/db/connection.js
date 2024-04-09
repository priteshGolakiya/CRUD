const mongoose = require("mongoose");

function connect() {
  return mongoose.connect(process.env.MONGO_URL);
}

module.exports = connect;
