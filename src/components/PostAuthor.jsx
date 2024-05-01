import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import { FaRegUser } from "react-icons/fa";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({ authorID, createdAt }) => {
  const [author, setAuthor] = useState({});
  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/posts/users/${
            authorID._id
          }`
        );
        setAuthor(response?.data);
      } catch (error) {
        console.error(error.response?.data.message);
      }
    };
    getAuthor();
  }, []);
  return (
    <Link to={`/posts/user/${authorID._id}`} className="post__author">
      <div
        style={
          !authorID.avatar ? { border: "2px solid black", borderRadius: "50%" } : null
        }
        className="post__author-avatar"
      >
        {authorID.avatar && (
          <img
            src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/${
              authorID?.avatar
            }`}
            alt="Author image"
          />
        )}
        {!authorID.avatar && (
          <FaRegUser
            style={{ height: "100%", width: "100%", padding: "6px" }}
          />
        )}
      </div>
      <div className="post_author-details">
        <h5>By: {authorID?.name}</h5>
        <small>
          <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
        </small>
      </div>
    </Link>
  );
};

export default PostAuthor;
