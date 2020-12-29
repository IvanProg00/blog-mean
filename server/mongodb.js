const mongoose = require("mongoose");

const {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_DB,
} = require("./config/config");

mongoose.connect(
  `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);


module.exports = mongoose;
