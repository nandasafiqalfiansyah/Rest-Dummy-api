const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenereator");
const authorize = require("../middleware/authorize");
const {
  createUser,
  getUsersbyId,
  deleteUser,
  getuserByEmail,
} = require("../db/user.db");
// auth
router.post("/register", validInfo, async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const user = await getuserByEmail(email);
    if (length(user) != 0) {
      return res.status(401).send("User already exist");
    }
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
    const newUser = await createUser(name, email, bcryptPassword);
    const jwtToken = jwtGenerator(newUser.rows[0].user_id);
    return res.json({ jwtToken });
  } catch (err) {
    res.status(500).send("internal server error");
    console.log(err);
  }
});

router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getuserByEmail(email);
    if (user.rows.length === 0) {
      return res.status(401).json("invalid Credential");
    }
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    if (!validPassword) {
      return res.status(401).json("invalid Cridential");
    }
    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json({ jwtToken });
  } catch (err) {
    res.status(500).send("server error");
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
