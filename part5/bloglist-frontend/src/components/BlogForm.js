import { useState } from "react";
import blogsService from "../services/blogs";

const BlogForm = ({ blogs, setBlogs, setMessage }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = async e => {
    e.preventDefault();

    try {
      const newBlog = await blogsService.create({ title, author, url });
      setBlogs([...blogs, newBlog]);
      setMessage({
        text: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        className: "success",
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      resetForm();
    } catch (err) {
      console.log(err);
      resetForm();
      setMessage({
        message: "Failed to create a new blog, something went wrong!",
        className: "error",
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h1>Create new</h1>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button onClick={handleCreate} type="submit">
          create
        </button>
      </form>
    </>
  );
};
export default BlogForm;
