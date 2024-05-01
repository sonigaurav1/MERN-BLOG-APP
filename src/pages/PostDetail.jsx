import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import PostAuthor from "../components/PostAuthor";
import { Link } from "react-router-dom";
import DeletePost from "./DeletePost";
import Loader from "../components/Loader";
import axios from "axios";
import { UserContext } from "../context/userContext";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/posts/${id}`
        );
        setPost(response.data);
      } catch (error) {
        setError(error)
      }
      setIsLoading(false);
    };
    getPosts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="post-detail">
      {error && <p className="error">{error}</p>}
      {post && (
        <div className="container post-detail__container">
          <div className="post-detail__header">
            <PostAuthor authorID={post.creator} createdAt={post.createdAt}/>
            {currentUser?.id == post?.creator._id && (
              <div className="post-detail__buttons">
                <Link to={`/posts/${post._id}/edit`} className="btn sm primary">
                  Edit
                </Link>
                <DeletePost postId={id} />
              </div>
            )}
          </div>
          <h1 style={{ textAlign: "center" }}>{post.title}</h1>
          <div className="post-detail__thumbnail">
            <img
              src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/${
                post.thumbnail
              }`}
              alt=""
            />
          </div>

          <p dangerouslySetInnerHTML={{__html: post.description}}></p>
        </div>
      )}
    </section>
  );
};

export default PostDetail;
