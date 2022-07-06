const bcrypt = require("bcrypt");
const Blog = require("../models/blog");
const User = require("../models/user");

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

const createUser = async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "test", name: "testing123", passwordHash });
  const savedUser = await user.save();
  return savedUser.toJSON();
};

module.exports = {
  initialBlogs,
  blogsInDb,
  createUser,
};
