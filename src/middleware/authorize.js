const response = require("../utils/response");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const token = req.header("jwt_token");
  if (!token) {
    return response(403, {}, "authorization denied", res);
  }

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verify.user;
    next();
  } catch (err) {
    return response(401, {}, "token is not valid", res);
  }
};
