const express = require('express')
const app = express()

const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();
const blogRouter = require('./controllers/blogs')



const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'unkown endpoint'});
};

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})