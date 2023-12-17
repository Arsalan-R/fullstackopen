const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/book')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared');
    await Blog.insertMany(helper.initialBlogs)
})

test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

afterAll(async () => {
    await mongoose.connection.close()
  })