const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const pool = require('../../config/config')
const validInfo = require('../middleware/validInfo')
const jwtGenerator = require('../utils/jwtGenereator')
const authorize = require('../middleware/authorize')

// auth
router.post('/register', validInfo, async (req, res) => {
  const { email, name, password } = req.body
  try {
    // ensure user alredy exits query
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email
    ])
    if (user.rows.length > 0) {
      return res.status(401).json('User alredy exits')
    }
    // encript pass
    const salt = await bcrypt.genSalt(10)
    const bcryptPassword = await bcrypt.hash(password, salt)
    // user register query
    const newUser = await pool.query(
      'INSERT INTO users (user_name ,user_email,user_password) VALUES ($1,$2,$3)',
      [name, email, bcryptPassword]
    )
    // generate jwt token
    const jwtToken = jwtGenerator(newUser.rows[0].user_id)
    return res.json({ jwtToken })
  } catch (err) {
    res.status(500).send('internal server error')
    console.log(err)
  }
})

router.post('/login', validInfo, async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email])
    if (user.rows.length === 0) {
      return res.status(401).json('invalid Credential')
    }
    const validPassword = await bcrypt.compare(
      password, user.rows[0].user_password
    )
    if (!validPassword) {
      return res.status(401).json('invalid Cridential')
    }
    const jwtToken = jwtGenerator(user.rows[0].user_id)
    return res.json({ jwtToken })
  } catch (err) {
    res.status(500).send('server error')
  }
})

// debug
router.get('/', (req, res) => {
  pool.query('SELECT * FROM users', (error, fields) => {
    if (error) throw error
    res.json(fields.rows)
  })
})

router.post('/verify', authorize, (req, res) => {
  try {
    res.json(true)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
