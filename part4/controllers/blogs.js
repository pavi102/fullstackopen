const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const mongoose = require("mongoose");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const savedBlog = await new Blog(req.body).save();
  res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

blogsRouter.put("/:id", async (req, res) => {
  const { title, author, url, likes } = req.body;

  // Wasn't able to get the model validation working with mongoose -kept returning 200
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
  console.log(updatedBlog);
  res.status(200).json(updatedBlog);
});

module.exports = blogsRouter;
