require('dotenv').config({ path: './config/.env'})
const express = require('express')
const app = express()
const cookiesParser = require('cookie-parser')
const cors = require("cors")
const corsOptions = require('./config/corsOptions')
const users = require('./routes/user')
const brand = require('./routes/brand')
const category = require('./routes/category')
const tags = require('./routes/tags')
const product = require('./routes/product')
const variant = require('./routes/variant')
const inventory = require('./routes/inventory')
const auth = require('./routes/auth')

app.use(cors(corsOptions))
app.use(cookiesParser())
app.use(express.json())

app.use("/api/v1", users, brand, category, tags, product, variant, inventory, auth)

module.exports = app