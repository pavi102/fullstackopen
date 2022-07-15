import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import Button from "./Button";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const handleCreate = async e => {
    e.preventDefault();
    try {
      dispatch(createBlog({ title, author, url }));
      dispatch(
        setNotification({
          message: `a new blog ${title} by ${author} added`,
          className: "success",
        })
      );
    } catch (err) {
      dispatch(
        setNotification({
          message: "Failed to create a new blog, something went wrong!",
          className: "error",
        })
      );
    }
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h1>Create new</h1>
      <form data-cy="blog-form" onSubmit={handleCreate}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="title"
            placeholder="title"
            data-cy="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="author"
            placeholder="author"
            data-cy="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            placeholder="url"
            data-cy="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button
          data-cy="create-button"
          backgroundColor="green"
          onClick={handleCreate}
          type="submit"
        >
          create
        </Button>
      </form>
    </>
  );
};
export default BlogForm;
