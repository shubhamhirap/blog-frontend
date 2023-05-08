import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import axios from "axios";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/post")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => (
          <React.Fragment>
            <Post {...post} />
          </React.Fragment>
        ))}
    </>
  );
};

export default IndexPage;
