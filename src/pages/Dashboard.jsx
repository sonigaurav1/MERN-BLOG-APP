import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DeletePost from "./DeletePost";
import { UserContext } from "../context/userContext";

const Dashboard = () => {
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // redirect to login page for any user who is not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  axios.defaults.withCredentials = true;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
        const response = await axios.get(`${API_URL}/posts/users/${currentUser.id}`);
        const data = response.data;
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };
    fetchData();
  }, []);
  return (
    <section className="dashboard">
      {posts.length > 0 ? (
        <div className="container dashboard__container">
          {posts.map(({ _id, title, thumbnail }) => {
            return (
              <article key={_id} className="dashboard__post">
                <div className="dashboard__post-info">
                  <div className="dashboard__post-thumbnail">
                    <img src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} alt="" />
                  </div>
                  <h5 style={{textAlign: "center"}}>{title}</h5>
                </div>
                <div className="dashboard__post-actions">
                  <Link to={`/posts/${_id}`} className="btn sm">
                    View
                  </Link>
                  <Link to={`/posts/${_id}/edit`} className="btn sm primary">
                    Edit
                  </Link>
                  <DeletePost postId={_id} />
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <h2 className="center">You have no posts yet.</h2>
      )}
    </section>
  );
};

export default Dashboard;
