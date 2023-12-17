const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')
const {MONGODB_URI} = require('./utils/config')

mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)

module.exports = app