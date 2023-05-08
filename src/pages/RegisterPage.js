import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  function register(e) {
    e.preventDefault();
    axios.post(
      "http://localhost:4000/register",
      { name, username, password },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    ).then(res => {
        navigate('/login')
    }).catch(err => console.log(err.message));
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
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
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
