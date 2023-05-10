import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import axios from "axios";
import { SERVER_URL } from "../services/server";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}post`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => (
          <React.Fragment key={post._id}>
            <Post {...post} />
          </React.Fragment>
        ))}
    </>
  );
};

export default IndexPage;
