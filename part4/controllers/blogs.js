const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.post("/", userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body;
  const user = req.user;

  const savedBlog = await new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  }).save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (req, res) => {
  const user = req.user;
  const blog = await Blog.findById(req.params.id);

  if (blog.user.toString() !== user.id.toString()) {
    return res
      .status(401)
      .json({ error: "you are not authorized to delete this resource" });
  }
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

blogsRouter.put("/:id", async (req, res) => {
  const { title, author, url, likes } = req.body;

  if (!title || !author) {
    return res.status(400).end();
  }
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, author, url, likes },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );
  res.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
