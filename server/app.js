const express = require("express");

const { PORT } = require("./config");
const mongoose = require("./mongodb");
const api_v1 = require("./routes/api_v1/router");

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use("/api/v1", api_v1);

app.listen(PORT, () => {
    console.log(`Server is working on ${PORT}...`);
});