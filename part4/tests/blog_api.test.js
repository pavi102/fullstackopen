const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./blogs_api_test_helper.js");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogs = helper.initialBlogs.map(blog => new Blog(blog));
  await Promise.all(blogs.map(blog => blog.save()));
});

afterAll(() => {
  mongoose.connection.close();
});

describe("When there are some blogs in the database", () => {
  test("blogs are successfully returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blogs have an id property", async () => {
    const blogs = await helper.blogsInDb();
    expect(blogs[0].id).toBeDefined();
  });
});

describe("Creating a new blog", () => {
  test("succeeds with a 201 if valid data", async () => {
    const newBlog = {
      title: "test blog create",
      author: "me",
      url: "fakeUrl3.com",
      likes: 10,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const savedBlog = blogsAtEnd[blogsAtEnd.length - 1];
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(savedBlog.id).toBeDefined();
  });

  test("succeeds if likes is missing and defaults to 0", async () => {
    const newBlog = {
      title: "test blog create",
      author: "me",
      url: "fakeUrl3.com",
    };

    const savedBlog = await (await api.post("/api/blogs").send(newBlog)).body;

    expect(savedBlog.id).toBeDefined();
    expect(savedBlog.likes).toBe(0);
  });

  test("fails with 400 if title or author fields are missing", async () => {
    const newBlog = {
      url: "fakeurl.com",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe("deleting a blog", () => {
  test("succeeds with a 204 if valid id", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
    expect(blogsAtStart).not.toContainEqual(blogsAtEnd);
  });

  test("fails with 400 if invalid id", async () => {
    await api.delete("/api/blogs/invalid").expect(400);
  });
});

describe("Updating a blog", () => {
  test("succeeds with valid data", async () => {
    const blogs = await helper.blogsInDb();
    const blogToUpdate = blogs[0];
    const modifiedBlog = {
      title: "updated blog",
      author: "me",
      url: "fakeurl.com",
      likes: 10000,
    };
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(modifiedBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const updatedBlogs = await helper.blogsInDb();
    const updatedBlog = updatedBlogs[0];

    expect(updatedBlog.id).toBe(blogToUpdate.id);
    expect(updatedBlog).toEqual({ id: blogToUpdate.id, ...modifiedBlog });
  });

  test("fails with 400 if invalid data", async () => {
    const blogs = await helper.blogsInDb();
    const blogToUpdate = blogs[0];
    const modifiedBlog = {
      url: "fakeurl.com",
      likes: 10000,
    };
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(modifiedBlog).expect(400);

    const updatedBlogs = await helper.blogsInDb();
    const updatedBlog = updatedBlogs[0];

    expect(updatedBlog).toEqual(blogToUpdate);
  });
});
