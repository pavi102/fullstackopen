import { useState, useEffect, useRef } from "react";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({});
  const blogFormRef = useRef();

  useEffect(() => {
    const fetchBlogs = async () => {
      const fetchedBlogs = await blogService.getAll();
      setBlogs(fetchedBlogs.sort((a, b) => b.likes - a.likes));
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const logoutHandler = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
    blogService.setToken("");
  };

  const createBlog = async blog => {
    blogFormRef.current.toggleVisibility();
    try {
      const newBlog = await blogService.create(blog);
      setBlogs([...blogs, newBlog]);
      setMessage({
        text: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        className: "success",
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (err) {
      setMessage({
        message: "Failed to create a new blog, something went wrong!",
        className: "error",
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const likeBlog = async id => {
    const blog = blogs.find(blog => blog.id === id);
    const likedBlog = { ...blog, likes: blog.likes + 1 };
    const updatedBlog = await blogService.update(id, likedBlog);
    const updatedBlogs = blogs
      .map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog))
      .sort((a, b) => b.likes - a.likes);
    setBlogs(updatedBlogs);
  };

  const deleteBlog = async id => {
    const blog = blogs.find(blog => blog.id === id);
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(id);
      setBlogs(blogs.filter(blog => blog.id !== id));
    }
  };

  return (
    <>
      {message && <Notification text={message.text} className={message.className} />}
      {!user ? (
        <Togglable buttonLabel="Login">
          <LoginForm setMessage={setMessage} setUser={setUser} />
        </Togglable>
      ) : (
        <>
          <div>
            <h1>blogs</h1>
            <p>
              {user.name} is logged in{" "}
              <button onClick={logoutHandler}>logout</button>
            </p>

            {blogs.map(blog => (
              <Blog
                user={user}
                deleteBlog={deleteBlog}
                likeBlog={likeBlog}
                key={blog.id}
                blog={blog}
              />
            ))}
          </div>
          <Togglable ref={blogFormRef} buttonLabel="New Blog">
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </>
      )}
    </>
  );
};

export default App;
