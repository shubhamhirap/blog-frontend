import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { SERVER_URL } from "../services/server";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    axios
      .get(`${SERVER_URL}profile`, {
        withCredentials: true,
      })
      .then((userInfo) => {
        setUserInfo(userInfo.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  function logout() {
    axios
      .post(
        `${SERVER_URL}logout`,
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
