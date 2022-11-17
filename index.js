const express = require("express");
const cors = require("cors");
const app = express();
const videosRoute = require("./routes/videos");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/videos", videosRoute);

app.listen(3000, () => {
  console.log("E. Charles White");
});

module.exports = app;
