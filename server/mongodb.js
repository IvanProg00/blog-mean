const mongoose = require("mongoose");

const {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_DB,
} = require("./config");

mongoose.connect(
  `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection
  .on("error", (err) => {
    console.error(err);
  })
  .once("open", () => {
    console.log("Mongodb is working...");
  });

module.exports = mongoose;
