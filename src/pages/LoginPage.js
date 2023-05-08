import React, { useContext, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext)

  function login(e) {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/login",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data) {
          setUserInfo(res.data)
          setRedirect(true);
        } else {
          alert("wrong credentials");
        }
      })
      .catch((e) => console.log(e.message));
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
