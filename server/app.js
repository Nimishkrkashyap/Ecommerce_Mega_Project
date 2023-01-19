require('dotenv').config()
const express = require('express')
const app = express()

// Getting all the Routes
const Routes = require("./routes/userRoutes")

app.use('/', Routes)

module.exports = app;