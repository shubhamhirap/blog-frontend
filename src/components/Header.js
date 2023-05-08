import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    axios
      .get("http://localhost:4000/profile", {
        withCredentials: true,
      })
      .then((userInfo) => {
        setUserInfo(userInfo);
      })
      .catch((err) => console.log(err.message));
  }, []);

  function logout() {
    axios
      .post(
        "http://localhost:4000/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setUserInfo(null);
      })
      .catch((err) => console.log(err.message));
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to={"/"} className="logo">
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link to={"/create"}>Create new post</Link>
            <p onClick={logout}>Logout</p>
          </>
        )}
        {!username && (
          <>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
