const cors = require('cors')
const app = require('./src/routes/routes')
const cookieParser = require('cookie-parser')
const express = require('express')
const { PORT } = process.env
const server = express()

server.use(cors())
server.disable('x-powered-by')
server.use(cookieParser())
server.use(express.urlencoded({ extended: false }))
server.use(express.json())
server.use(app)

server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
