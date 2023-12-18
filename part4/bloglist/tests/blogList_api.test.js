const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);
const helper = require('./test_helper');
const mongoose = require('mongoose');

const Blog = require('../models/blog');

beforeEach(async () => {
    await Blog.deleteMany({});
    console.log('cleared');
    await Blog.insertMany(helper.initialBlogs);
}, 1000000);

//4.8
test('all blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

//4.9
test('all the blogs have a unique identifier (id)', async () => {
  const res = await api.get('/api/blogs')
  .expect(200)
  for (const blog of res.body){
    expect(blog.id).toBeDefined()
  }
},100000)

//4.10
test('can post a blog', async () => {
  const newBlog = {
    "title": "delete soon",
    "author": "delete soon",
    "url": "delete soon",
    "likes": 0,
  } 

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/blogs')
  .expect(200)
  expect(res.body).toHaveLength(helper.initialBlogs.length + 1)

  const titles = res.body.map(r => r.title)

  expect(titles).toContain(
    'delete soon')
}, 100000 )

//4.11
test('like defaults to zero', async () => {
  const newBlog = {
    "title": "default",
    "author": "like",
    "url": "to zero",
  } 

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/blogs')
  .expect(200)

  const checkBlog = res.body.find(r => r.title === 'default')
  console.log(res.body);
  expect(checkBlog.likes).toBe(0)
},1000000)

//4.12
test('if url or title is missing, does not get added', async () => {
  const newBlog = {
    "title": "oops",
    "author": "forgot the url"
  } 

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)
  .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/blogs')
  .expect(200)
  expect(res.body).toHaveLength(helper.initialBlogs.length)

},1000000)

afterAll(async () => {
    await mongoose.connection.close();
  });