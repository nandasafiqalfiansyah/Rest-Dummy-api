const express = require("express");
const user = require("../handler/user");
const card = require("../handler/card");
const response = require("../utils/response.js");

const app = express();

app.use("/user", user);
app.use("/card", card);
app.use("*", function (req, res) {
  response(404, "not found", "🤣👋", res);
});

module.exports = app;
