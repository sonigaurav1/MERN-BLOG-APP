import axios from "axios";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import Loader from "./Loader";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] =  useState(false)
  const [message, setMessage ] = useState("No posts found")

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const API_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
        const response = await axios.get(`${API_URL}/posts`);
        setPosts(response.data);
      } catch (error) {
        const errorMessage = error.response?.data.message;
        if(errorMessage === undefined){
          return setMessage("Our server is currently on a coffee break ☕️... or maybe it's just dealing with some unexpected bugs. We're on the case and will have it back up and running smoothly soon! 🛠️ #BugHunt #TechTroubles")
        }
        console.error(errorMessage);
      } finally{
        setIsLoading(false);
        setIsFetched(true);
      }
    };
    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <section>
        <Loader />
      </section>
    );
  }

  return (
    <section className="posts">
      {isFetched && (
        <>
          {posts.length > 0 && (
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
          )}
          {posts.length == 0 && <h2 className="center font-medium max-w-screen-md ">{message}</h2>}
        </>
      )}
    </section>
  );
};

export default Posts;
