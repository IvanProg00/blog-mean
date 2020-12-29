const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const { PORT } = require("./config/config");
const mongoose = require("./mongodb");
const api_v1 = require("./router/api_v1/router");

mongoose.connection
  .on("error", (err) => {
    console.error("MONGODB: ERROR", err);
  })
  .once("open", () => {
    console.log("MONGODB: Successfully connected.");
    main();
  });

function main() {
  const app = express();

  app.use(express.urlencoded());
  app.use(compression());
  app.use(express.json());
  app.use(cors());
  app.use(helmet());

  app.use("/api/v1", api_v1);

  app.listen(PORT, () => {
    console.log(`Server is working on ${PORT}...`);
  });
}
