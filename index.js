const { response } = require('express');
const express = require('express');
const app = express();

app.get("/", function(req, res){
    res.send("Welcome to /")
}).get("/videos", function(req, res){
    res.send("Welcome to /videos")
}).get("/videos/:id", function(req, res){
    res.send("Welcome to /videos/:id")
}).post("/videos", function(req, res){
    res.send("Welcome to /videos")
})

app.listen(3000, function(){
    console.log("Hello World")
})