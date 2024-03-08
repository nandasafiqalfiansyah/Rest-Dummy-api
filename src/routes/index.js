const express = require("express");
const authRoutes = require("../handler/auth.js");
const indexRouter = require("../handler/index.js");

const app = express();
app.disable("x-powered-by");

app.use("/", indexRouter);
app.use("/auth", authRoutes);

module.exports = app;
