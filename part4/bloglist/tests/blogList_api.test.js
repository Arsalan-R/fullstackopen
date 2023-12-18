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
describe('get request tests', () => {
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
})

//4.10
describe('post request tests', () => {
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

  const res = await api.get('/api/blogs')
  .expect(200)
  expect(res.body).toHaveLength(helper.initialBlogs.length)

},1000000)
})

//4.13
describe('delete request tests', () => {
  test('deletes a particular post', async () => {
    const blogsAtStart = await helper.blogsInDb() 
    const blogToDelete = blogsAtStart[0]  
    
    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  }, 100000)

  test('if an id was already deleted, sends 204 no content', async () => {
    const blogsAtStart = await helper.blogsInDb() 
    const blogToDelete = blogsAtStart[0]  
    
    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  }, 1000000)
  })

//4.14
describe('put request tests', () => {
  test('updates a particular post', async () => {
    const blogsAtStart = await helper.blogsInDb() 
    const blogTochange = blogsAtStart[0]  
    
    const updatedBlog = {
      title: 'title updated',
      author: 'author updated',
      url: 'url updated',
      likes: 100,   
  }

    await api
    .put(`/api/blogs/${blogTochange.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain(updatedBlog.title)
  }, 100000)

  test('if title or url is not valid it returns an error', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogTochange = blogsAtStart[0]
    const updatedBlog = {
      title: 'title updated',
      author: 'author updated',
      url: null, //not valid
      likes: 100,   
  }
  await api
  .put(`/api/blogs/${blogTochange.id}`)
  .send(updatedBlog)
  .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).not.toContain(updatedBlog.title)
  })
})

afterAll(async () => {
    await mongoose.connection.close();
  });