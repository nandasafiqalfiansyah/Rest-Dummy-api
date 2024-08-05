const express = require("express");
const indexRouter = require("../handler/index.js");
const user = require("../handler/user.js");
const card = require("../handler/card.js");

const app = express();

app.use("/", indexRouter);
app.use("/user", user);
app.use("/card", card);

module.exports = app;
