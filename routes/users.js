var express = require("express");
var router = express.Router();
const pool = require("../src/data/db");
const response = require("../src/response");

router.get("/card", function (req, res, next) {
  const sql = `SELECT * FROM cards`;
  pool.query(sql, (error, fields) => {
    if (error) throw error;
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
