import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { FaRegUser } from "react-icons/fa";

const Authors = () => {
  axios.defaults.withCredentials = true;

  const [authors, setAuthors] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const API_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
        const response = await axios.get(`${API_URL}/users`);
        const data = response.data;
        setAuthors(data);
      } catch (error) {
        const errorMessage = error.response.data.message;
        console.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section>
        <Loader />
      </section>
    );
  }
  return (
    <section className="authors">
      {authors.length > 0 && (
        <div className="container authors__container">
          {authors.map(({ _id, name, posts, avatar }) => {
            return (
              <Link key={_id} to={`/posts/user/${_id}`} className="author">
                <div key={_id} className="author__container">
                  <div className="author__avatar">
                    {!avatar && (
                      <FaRegUser
                        style={{
                          width: "100%",
                          height: "100%",
                          padding: "1rem",
                        }}
                      />
                    )}
                    {avatar && (
                      <img
                        src={`${
                          import.meta.env.VITE_REACT_APP_ASSETS_URL
                        }/uploads/${avatar}`}
                        alt={`Image of ${name}`}
                      />
                    )}
                  </div>
                  <div className="author__info">
                    <h4>{name}</h4>
                    <p>Posts: {posts}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      {authors.length == 0 && (
        <h2 className="center">No users/authors found.</h2>
      )}
    </section>
  );
};

export default Authors;
