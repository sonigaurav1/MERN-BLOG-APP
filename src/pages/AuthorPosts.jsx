import React, { useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const AuthorPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const API_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
        const response = await axios.get(`${API_URL}/posts/users/${id}`);
        const data = response.data;
        setPosts(data);
      } catch (error) {
        setError(error.response.data.message);
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
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map(
            ({
              _id: id,
              thumbnail,
              category,
              title,
              description,
              creator,
              createdAt,
            }) => (
              <PostItem
                key={id}
                postID={id}
                thumbnail={thumbnail}
                category={category}
                title={title}
                description={description}
                authorID={creator}
                createdAt={createdAt}
              />
            )
          )}
        </div>
      ) : (
        <h2 className="center">No posts found</h2>
      )}
    </section>
  );
};

export default AuthorPosts;
