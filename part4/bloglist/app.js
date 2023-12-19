const express = require('express')
require('express-async-errors') 
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();
const middleware = require('./utils/middleware')

const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')

const {MONGODB_URI} = require('./utils/config')


mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app