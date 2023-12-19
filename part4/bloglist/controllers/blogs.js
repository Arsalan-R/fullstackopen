const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      return authorization.replace('Bearer ', '')
    }
    return null
  }

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
      
  })
  
blogRouter.post('/', async (request, response) => {
    const body = request.body
    
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })

    const result = await blog.save()  
    user.blogs = user.blogs.concat(result._id)
    await user.save()

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
