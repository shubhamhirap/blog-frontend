import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  function createNewPost(e) {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    axios
      .post("http://localhost:4000/post", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/");
        } else {
          console.log("something went wrong!!");
        }
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <>
      <form onSubmit={createNewPost}>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
        />
        <input
          type="text"
          id="summary"
          name="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="summary"
        />
        <input
          type="file"
          onChange={(e) => setFiles(e.target.files)}
          accept="image/*"
        />
        <Editor value={content} onChange={setContent} />
        <button style={{ marginTop: "10px" }}>Create Post</button>
      </form>
    </>
  );
};

export default CreatePost;
