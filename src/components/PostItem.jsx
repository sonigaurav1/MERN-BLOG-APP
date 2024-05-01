import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";

const PostItem = ({
  postID,
  category,
  title,
  description,
  authorID,
  createdAt,
  thumbnail,
}) => {
  const shortDescription =
    description.length > 145 ? description.substr(0, 145) + "..." : description;
  const postTitle = title.length > 45 ? title.substr(0, 45) + "..." : title;

  const htmlDesc = { __html: shortDescription };

  return (
    <article className="post">
      <div className="post__thumbnail">
        <img src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} alt={title} />
      </div>
      <div className="post__content">
        <Link to={`/posts/${postID}`}>
          <h3 style={{textAlign: "center"}}>{postTitle}</h3>
        </Link>
        
        <div style={{textAlign: "center"}} dangerouslySetInnerHTML={htmlDesc} />

        <div className="post__footer">
          <PostAuthor authorID={authorID} createdAt={createdAt} />
          <Link to={`/posts/categories/${category}`} className="btn category">
            {category}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
