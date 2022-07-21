import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const LoginForm = ({ show, setErrorMessage, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: error => setErrorMessage(error.graphQLErrors[0].message),
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data, setToken]);

  const handleLogin = e => {
    e.preventDefault();
    login({ variables: { username, password } });
    setUsername("");
    setPassword("");
  };

  if (!show) {
    return null;
  }

  return (
    <form>
      <div>
        username:{" "}
        <input
          value={username}
          type="text"
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        password:{" "}
        <input
          value={password}
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>login</button>
    </form>
  );
};
export default LoginForm;
