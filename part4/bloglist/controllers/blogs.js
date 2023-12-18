const blogRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
      
  })
  
blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const result = await blog.save()       
    response.status(201).json(result)
    })

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
})

//4.13
blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogRouter
