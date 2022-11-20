const express = require("express");
const fs = require("fs");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

router.get("/", function (req, res) {
  const videoDetailsJSON = fs.readFileSync("./data/videos.json");
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

router.get("/:id", function (req, res) {
  const id = req.params.id;
  const videoDetailsJSON = fs.readFileSync("./data/videos.json");
  const videoDetails = JSON.parse(videoDetailsJSON);
  const result = videoDetails.find((video) => {
    return video.id === id;
  });
  res.send(result);
});

router.post("/", function (req, res) {
  const body = req.body;
  const video = {
    id: uuidv4(),
    title: body.title,
    channel: "The Weekday",
    image: body.image,
    description: body.description,
    views: "0",
    likes: "0",
    duration: "0:00",
    video: "https://project-2-api.herokurouter.com/stream",
    timestamp: Date.now(),
    comments: [],
  };
  const videoDetailsJSON = fs.readFileSync("./data/videos.json");
  const videoDetails = JSON.parse(videoDetailsJSON);
  const results = [...videoDetails, video];
  fs.writeFile("./data/videos.json", JSON.stringify(results), (err) => {
    if (err) {
      console.error(err);
    }
  });
  res.send(video);
});

module.exports = router;
