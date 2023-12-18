const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'title for testing',
        author: 'author for testing',
        url: 'url for testing',
        likes: 10,   
    },
    {
        title: 'hi',
        author: 'this is',
        url: 'a test',
        likes: 1,  
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

module.exports = {
    initialBlogs,
    blogsInDb
}