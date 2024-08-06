const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenereator");
const authorize = require("../middleware/authorize");
const response = require("../utils/response");
const {
  createUser,
  getUsersbyId,
  deleteUser,
  GetuserByEmail,
} = require("../db/user.db");
// auth
router.post("/register", validInfo, async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await GetuserByEmail(email);
    if (user != null) {
      return response(401, {}, "user already exist", res);
    }
    const bcryptpass = await bcrypt.hash(password, 10);
    createUser(
      name,
      email,
      bcryptpass,
      "https://firebasestorage.googleapis.com/v0/b/backend-anak.appspot.com/o/user%2Fdefault.jpeg?alt=media",
      "",
      0
    );
    return response(200, {}, "user created", res);
  } catch (err) {
    return response(500, err.message, "server error", res);
  }
});

router.post("/login", validInfo, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await GetuserByEmail(email);
    if (user == null) {
      return response(404, {}, "user not found", res);
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json("invalid Cridential");
    }
    const jwtToken = jwtGenerator(user.id);
    return response(200, jwtToken, "user logged in", res);
  } catch (err) {
    return response(500, err.message, "server error", res);
  }
});

router.get("/", authorize, async (req, res) => {
  try {
    const user = await getUsersbyId(req.user.id);
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/delete", authorize, async (req, res) => {
  try {
    const user = await deleteUser(req.user.id);
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
