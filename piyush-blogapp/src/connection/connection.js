const mongoose = require("mongoose");

async function connectMongoDb(dbPath) {
  return mongoose.connect(dbPath);
}

module.exports = connectMongoDb;
