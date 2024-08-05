const express = require("express");
const router = express.Router();
const response = require("../template/response");

/* GET home page. */
router.get("/", function (req, res, next) {
  const date = new Date();
  const data = {
    Project_Name: "Dummy API's Faster",
    Version: "V1.1",
    Framework: "Express js",
    Author: "Nanda safiq alfiansyah",
    Date: date,
    Github: "https://github.com/nandasafiqalfiansyah",
  };
  response(200, data, "success", res);
});

module.exports = router;
