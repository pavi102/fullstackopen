import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/LoginForm";
import BlogsList from "./components/BlogsList";
import UsersList from "./components/UsersList";
import Notification from "./components/Notification";
import { setLoggedInUser } from "./reducers/loggedInUserReducer";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { Route, Routes, useMatch } from "react-router-dom";
import User from "./components/User";
import Blog from "./components/Blog";
import { initalizeUsers } from "./reducers/usersReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import Navbar from "./components/Navbar";
import Container from "./components/Container";

const App = () => {
  const loggedInUser = useSelector(state => state.loggedInUser);
  const users = useSelector(state => state.users);
  const blogs = useSelector(state => state.blogs);

  const userMatch = useMatch("/users/:id");
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null;

  const blogMatch = useMatch("/blogs/:id");
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null;

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setLoggedInUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initalizeUsers());
    dispatch(initializeBlogs());
  }, []);

  const logoutHandler = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(setLoggedInUser(null));
    blogService.setToken("");
  };

  return (
    <Container>
      <Navbar loggedInUser={loggedInUser} logoutHandler={logoutHandler} />
      <Notification />
      {!loggedInUser ? (
        <Togglable buttonLabel="Login">
          <LoginForm />
        </Togglable>
      ) : (
        <>
          <div>
            <h1>Blogs</h1>

            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Togglable ref={blogFormRef} buttonLabel="New Blog">
                      <BlogForm />
                    </Togglable>
                    <BlogsList blogs={blogs} />
                  </>
                }
              />
              <Route path="/blogs" element={<BlogsList blogs={blogs} />} />
              <Route path="/users" element={<UsersList users={users} />} />
              <Route path="/users/:id" element={<User user={user} />} />
              <Route
                path="/blogs/:id"
                element={<Blog loggedInUser={loggedInUser} blog={blog} />}
              />
            </Routes>
          </div>
        </>
      )}
    </Container>
  );
};

export default App;
