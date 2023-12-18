const blogRouter = require('express').Router()
const { request } = require('express')
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

//4.14
blogRouter.put('/:id', async (request, response) => {
const updatedBlog = request.body
await Blog.findByIdAndUpdate(
    request.params.id,
    updatedBlog,
    { new: true, runValidators: true, context: 'query' })

    response.status(200).json(updatedBlog)
})

module.exports = blogRouter
