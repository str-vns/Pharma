require('dotenv').config({ path: './config/.env'})
const express = require('express')
const app = express()
const cookiesParser = require('cookie-parser')
const cors = require("cors")
const corsOptions = require('./config/corsOptions')

app.use(cors(corsOptions))
app.use(cookiesParser())
app.use(express.json())


module.exports = app