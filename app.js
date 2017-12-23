//Dependencies
const express = require("express");
const app = express();
const aws = require("aws-sdk");
const bodyParser = require("body-parser");
//Configure dotenv
require("dotenv").config();

//Setup: bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Static
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

//Use controller folder
const controller = require("./controller");
app.use(controller);

//Main route
app.get("/", (req, res) => {
  res.sendFile("index.html");
})

//Listen
app.listen((process.env.PORT || 3000), function() {
  console.log("app running on port 3000");
})