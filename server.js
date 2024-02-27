var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var usersRouter = require("./routes/users");
var authRoutes = require("./src/handler/auth");
const { initializeSession } = require("./src/middleware/middleware");
const swagger = require("./swagger.js");

var app = express();
swagger(app);
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(initializeSession);

app.use("/auth", authRoutes);
app.use("/users", usersRouter);

var port = process.env.PORT || "5000";
app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
