import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../services/server";


const Post = ({ _id, title, summary, content, cover, createdAt, author }) => {
  return (
    <div className="post">
      <div className="img">
        <Link to={`/post/${_id}`}>
          <img src={`${SERVER_URL}${cover}`} alt="blog img 1" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author.name}</a>
          <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
