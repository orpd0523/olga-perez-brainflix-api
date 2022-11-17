const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const app = express();
const fs = require("fs");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/videos", function (req, res) {
  const videoDetailsJSON = fs.readFileSync("./data/video-details.json");
  const videoDetails = JSON.parse(videoDetailsJSON);
  const results = videoDetails.map((video) => {
    return {
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    };
  });
  res.send(results);
});

app.get("/videos/:id", function (req, res) {
  const id = req.params.id;
  const videoDetailsJSON = fs.readFileSync("./data/video-details.json");
  const videoDetails = JSON.parse(videoDetailsJSON);
  const result = videoDetails.find((video) => {
    return video.id === id;
  });
  res.send(result);
});

app.post("/videos", function (req, res) {
  const body = req.body;
  const video = {
    id: crypto.randomUUID(),
    title: body.title,
    channel: "Molotov",
    image: "https://i.scdn.co/image/ab67616d0000b2735e2b069b2306267d474c43dd",
    description: body.description,
    views: "0",
    likes: "0",
    duration: "6:66",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: Date.now(),
    comments: [],
  };
  const videoDetailsJSON = fs.readFileSync("./data/video-details.json");
  const videoDetails = JSON.parse(videoDetailsJSON);
  const results = [...videoDetails, video];
  fs.writeFile('./data/video-details.json', JSON.stringify(results), err => {
    if (err) {
      console.error(err);
    }
  });
  res.send(results);
});

app.listen(3000, function () {
  console.log("Hello World");
});

module.exports = app;
