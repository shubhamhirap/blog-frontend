import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Editor from "../components/Editor";
import axios from "axios";
import { SERVER_URL } from "../services/server";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get(`${SERVER_URL}post/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setSummary(res.data.summary);
        setContent(res.data.content);
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  function updatePost(e) {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    axios
      .put(`${SERVER_URL}post`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          navigate(`/post/${id}`);
        } else {
          console.log("Something Went Wrong!!");
        }
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <>
      <form onSubmit={updatePost}>
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
        <button style={{ marginTop: "10px" }}>Edit Post</button>
      </form>
    </>
  );
};

export default EditPost;
