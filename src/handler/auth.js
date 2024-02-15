var express = require("express");
var router = express.Router();
const localStorage = require("localStorage");
const pool = require("../data/db");
const response = require("../../src/response");

router.get("/status", (req, res) => {
  const isLoggedIn = req.session.isLoggedIn || false;
  if (isLoggedIn) {
    res.json({
      isLoggedIn: true,
      id: req.session.id,
      username: req.session.username,
      role: req.session.role,
    });
  } else {
    res.json({ isLoggedIn: false });
  }
});

router.get("/", async (req, res) => {
  const sql = `SELECT * FROM users ORDER BY id DESC`;
  pool.query(sql, (error, fields) => {
    if (error) throw error;
    response(200, fields.rows, "success", res);
  });
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const role = "admin";
  const query =
    "INSERT INTO users (username, password, role) VALUES ($1, $2, $3)";
  const values = [username, password, role];
  pool.query(query, values, (error, fields) => {
    if (error) {
      response(500, "Internal Server Error", error.detail, res);
    } else {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);
      const data = {
        command: fields.command,
        isSuccess: fields.rowCount,
        username: username,
      };
      response(200, data, "register successful", res);
    }
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = $1 AND password = $2";
  const values = [username, password];
  console.log(values);
  pool.query(query, values, (error, fields) => {
    if (error) {
      response(500, "Internal Server Error", error.detail, res);
    } else {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("id", fields.rows[0].id);
      localStorage.setItem("username", username);
      localStorage.setItem("role", fields.rows[0].role);
      const data = {
        command: fields.command,
        success: fields.rowCount,
        username: username,
      };
      response(200, data, "login successful", res);
    }
  });
});

router.get("/logout", (req, res) => {
  req.session.isLoggedIn = false;
  req.session.id = null;
  req.session.username = null;
  req.session.role = null;
});

module.exports = router;
