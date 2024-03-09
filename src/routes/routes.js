const express = require('express')
const jwtauth = require('../handler/jwtAuth.js')
const dashboard = require('../handler/dashboard.js')
const indexRouter = require('../handler/index.js')

const app = express()

app.use('/', indexRouter)
app.use('/authentication', jwtauth)
app.use('/dahboard', dashboard)

module.exports = app
