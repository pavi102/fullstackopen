import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({});

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
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

  return (
    <>
      {message && <Notification text={message.text} className={message.className} />}
      {!user ? (
        <LoginForm setMessage={setMessage} setUser={setUser} />
      ) : (
        <>
          <div>
            <h1>blogs</h1>
            <p>
              {user.name} is logged in{" "}
              <button onClick={logoutHandler}>logout</button>
            </p>

            {blogs.map(blog => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
          <BlogForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} />
        </>
      )}
    </>
  );
};

export default App;
