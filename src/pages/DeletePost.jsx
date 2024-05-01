import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DeletePost = ({ postId }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // redirect to login page for any user who is not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleDeletePost = () => {
    const API_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    axios
      .delete(`${API_URL}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  return (
    <button className="btn sm danger" onClick={handleDeletePost}>
      Delete
    </button>
  );
};

export default DeletePost;
