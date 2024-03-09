require('dotenv').config()
const { Pool } = require('pg')

const isProduction = process.env.NODE_ENV === 'production'

const connectionString = `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT_DB}/${process.env.DATABASE}?sslmode=require`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString
})

module.exports = pool
