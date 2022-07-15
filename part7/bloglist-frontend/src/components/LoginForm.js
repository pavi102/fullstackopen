import { useState } from "react";
import loginService from "../services/login";
import { setNotification } from "../reducers/notificationReducer";
import blogService from "../services/blogs";
import { setLoggedInUser } from "../reducers/loggedInUserReducer";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setLoggedInUser(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotification({
        text: "Wrong Credentials",
        className: "error",
      });
    }
  };
  return (
    <>
      <h1>Login to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            data-cy="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            data-cy="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button onClick={handleLogin} type="submit">
          login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
