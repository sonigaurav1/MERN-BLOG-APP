import React, { useEffect, useState } from "react";
import { DUMMY_POSTS } from "../data";
import axios from "axios";
import PostItem from "../components/PostItem";
import { useParams } from "react-router-dom";

const CategoryPosts = () => {
  axios.defaults.withCredentials = true;
  const [posts, setPosts] = useState([]);
  const { category } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
        const response = await axios.get(
          `${API_URL}/posts/categories/${category}`
        );
        const data = response.data;
        console.log(data);
        setPosts(data);
      } catch (error) {
        const errorMessage = error.response.data.message;
        console.error(errorMessage);
        setPosts([]);
      }
    };
    fetchData();
  }, [category]);
  return (
    <section>
      {posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map(
            (
              {
                _id,
                category,
                title,
                description,
                thumbnail,
                creator,
                createdAt,
              } //thumbnail
            ) => (
              <PostItem
                key={_id}
                postID={_id}
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
        <h2 className="center">{`No posts found for ${category}`}</h2>
      )}
    </section>
  );
};

export default CategoryPosts;
