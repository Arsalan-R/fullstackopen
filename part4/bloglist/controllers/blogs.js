const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", "-blogs");
  response.json(blogs);
});

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;

  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();

  response.status(201).json(result);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  response.json(blog);
});

//4.13
blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() === user.id) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      // handle the unauthorized case
      response
        .status(403)
        .json({ error: "you are not authorized to delete this blog" });
    }
  },
);

//4.14
blogRouter.put("/:id", async (request, response) => {
  const updatedBlog = request.body;
  await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
    new: true,
    runValidators: true,
    context: "query",
  });

  response.status(200).json(updatedBlog);
});


//comment
blogRouter.put('/:id/comments', async (req, response) => {
  const blog = await Blog.findById(req.params.id);
  const newComment = req.body.comment;
  const result = await Blog.findByIdAndUpdate(req.params.id, { $push: { comments: newComment } }); 
  response.status(200).json(result) 
})

module.exports = blogRouter;
