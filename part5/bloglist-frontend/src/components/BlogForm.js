import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = async e => {
    e.preventDefault();

    createBlog({ title, author, url });
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
        <button data-cy="create-button" onClick={handleCreate} type="submit">
          create
        </button>
      </form>
    </>
  );
};
export default BlogForm;
