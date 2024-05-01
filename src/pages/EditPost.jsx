import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // redirect to login page for any user who is not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const API_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

  const { id } = useParams();
  const navigate = useNavigate();

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
    "Agriculture",
    "Business",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Uncategorized",
    "Weather",
  ];

  useEffect(() => {
    axios
      .get(`${API_URL}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTitle(response.data.title);
        setCategory(response.data.category);
        setDescription(response.data.description);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .patch(
        `${API_URL}/posts/${id}`,
        {
          title: title,
          category: category,
          description: description,
          thumbnail: thumbnail,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((err) => {
        alert("Error in updating post");
      });
  }

  return (
    <section className="create-post">
      <div className="container">
        <h2 style={{ textAlign: "center" }}>Edit Post</h2>
        <form className="form create-post__form" onSubmit={handleSubmit}>
          <input
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
            accept="png, jpg, jpeg"
            id="file"
          />
          <label
            className="btn primary"
            style={{ marginInline: "auto" }}
            htmlFor="file"
          >
            Upload Thumbnail Image
          </label>
          <button
            style={{ marginInline: "auto", width: "6rem" }}
            type="submit"
            className="btn primary"
          >
            {" "}
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditPost;
