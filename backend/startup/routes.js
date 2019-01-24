const express = require("express");
const cards = require("../routes/cards");
const play = require("../routes/play");
const profiles = require("../routes/profiles");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/cards", cards);
  app.use("/api/play", play);
  app.use("/api/profiles", profiles);
};
