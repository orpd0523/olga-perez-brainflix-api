require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001
const videosRoute = require("./routes/videos");
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/videos", videosRoute);

app.listen(port, () => {
  
});

module.exports = app;
