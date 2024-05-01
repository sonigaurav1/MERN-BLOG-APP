import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/userContext";

const CreatePost = () => {
  axios.defaults.withCredentials = true;
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // redirect to login page for any user who is not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { intent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const POST_CATEGORIES = [
    // "Select Category",
    "Agriculture",
    "Business",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Uncategorized",
    "Weather",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("thumbnail", thumbnail);

    const API_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    axios
      .post(`${API_URL}/posts/create-post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        const errorMessage = err.response.data.message;
        setError(errorMessage);
      });
    // .finally(() => navigate("/"));
  };

  return (
    <section className="create-post">
      <div className="container">
        <h2 className="center">Create Post</h2>
        <form className="form create-post__form" onSubmit={handleSubmit}>
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            autoFocus
          />
          <select
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            {POST_CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <ReactQuill
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
          />
          <input
            style={{ display: "none" }}
            type="file"
            onChange={(e) => setThumbnail(e.target.files[0])}
            accept="png, jpg, jpeg, avif"
            id="file"
          />
          <label
            className="btn primary"
            style={{ marginInline: "auto" }}
            htmlFor="file"
          >
            {!thumbnail
                  ? "Upload Thumbnail Image"
                  : thumbnail.name.slice(0, 25)}
          </label>
          {error && (
            <p style={{ textAlign: "center" }} className="form__error-message">
              {error}
            </p>
          )}
          <button
            style={{ marginInline: "auto", width: "6rem" }}
            type="submit"
            className="btn primary"
          >
            {" "}
            Create
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
