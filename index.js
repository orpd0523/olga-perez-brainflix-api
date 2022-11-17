const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.send("Welcome to /");
});

app.get("/videos", function (req, res) {
  const videoDetailsJSON = fs.readFileSync("./data/video-details.json");
  let videoDetails = JSON.parse(videoDetailsJSON);
  let results = videoDetails.map((video) => {
    return {
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image
    };
  });
  res.send(results);
});

app.get("/videos/:id", function (req, res) {
  res.send("Welcome to /videos/:id");
});

app.post("/videos", function (req, res) {
  res.send("Welcome to /videos");
});

app.listen(3000, function () {
  console.log("Hello World");
});

module.exports = app;
