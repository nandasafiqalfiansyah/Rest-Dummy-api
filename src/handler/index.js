const express = require("express");
const router = express.Router();
const { pool } = require("../../config/config");
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

router.get("/card", function (req, res, next) {
  const sql = `SELECT * FROM cards ORDER BY id DESC`;
  pool.query(sql, (error, fields) => {
    if (error) {
      response(500, error, "Internal Server Error", res);
    }
    response(200, fields.rows, "success", res);
  });
});

router.post("/card", (req, res) => {
  const { title, description, rate } = req.body;
  const sql =
    "INSERT INTO cards (title, description, rate) VALUES ($1, $2, $3)";
  const values = [title, description, rate];
  pool.query(sql, values, (error, fields) => {
    if (error) {
      response(500, error, "Internal Server Error", res);
    } else {
      const data = {
        command: fields.command,
        isSuccess: fields.rowCount,
      };
      response(200, data, "success", res);
    }
  });
});

router.delete("/card/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM cards WHERE id =${id}`;
  pool.query(sql, (error, fields) => {
    if (error) {
      response(500, "Internal Server Error", "unsuccess", res);
    } else {
      const data = {
        command: fields.command,
        isSuccess: fields.rowCount,
      };
      response(200, data, "success", res);
    }
  });
});

module.exports = router;
