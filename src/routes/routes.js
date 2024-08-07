const express = require("express");
const user = require("../handler/user");
const card = require("../handler/card");
const apiv1 = require("../handler/apiv1.js");
const response = require("../utils/response.js");

const app = express();

// app.use("/", function (req, res, next) {
//   response(200, "welcome to rest api", "👋", res);
// });
app.use("/user", user);
app.use("/api/v1", apiv1);
app.use("/card", card);
app.use("*", function (req, res) {
  response(404, "page not found", "🤣👋", res);
});

module.exports = app;
