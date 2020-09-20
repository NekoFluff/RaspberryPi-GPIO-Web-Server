require("dotenv").config();
const express = require("express");
const app = express();

const light = require('./light.js')


// const db = require('db')
// db.connect({
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS
// })

console.log("HOST:", process.env.DB_HOST);

app.get("/", function (req, res) {
  res.send("Okaeri! Welcome back! :3");
});

// import { turnOn, turnOff } from './light.js';

app.get("/on", function (req, res) {
  light.turnOn();
  res.send("Turning on light.");
})

app.get("/off", function (req, res) {
  light.turnOff();
  res.send("Turning off light.");
})

app.get("/blink", function (req, res) {
  light.blink(5000);
  res.send("Blinking light.");
})

app.get("/readButton", function (req, res) {
  light.readButton();
  res.send("Reading button for light.");
})

app.get("/stopReadingButton", function (req, res) {
  light.stopReadingButton();
  res.send("Stop reading button for light.");
})

app.listen(process.env.PORT, console.log(`Listening on port ${process.env.PORT}.`));
