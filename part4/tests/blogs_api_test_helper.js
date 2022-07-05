const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "test 1",
    author: "me",
    url: "fakeUrl.com",
    likes: 3,
  },
  {
    title: "test 2",
    author: "me",
    url: "fakeUrl2.com",
    likes: 2,
  },
  {
    title: "test 3",
    author: "someone else",
    url: "fakeUrl3.com",
    likes: 5,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
