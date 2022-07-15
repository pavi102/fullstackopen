import { useState } from "react";
import { likeBlog, deleteBlog, createComment } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "./Button";

const Blog = ({ loggedInUser, blog }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = () => {
    dispatch(deleteBlog(blog));
    navigate("/");
  };

  const handleCreateComment = e => {
    e.preventDefault();
    if (!comment) return;
    dispatch(createComment(blog.id, { comment }));
  };

  if (!blog) return null;

  return (
    <>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <br />
      {blog.likes} likes{" "}
      <Button backgroundColor="green" type="button" onClick={handleLike}>
        like
      </Button>
      <br />
      added by {blog.user.name}
      <br />
      {blog.user.id === loggedInUser.id ? (
        <Button backgroundColor="red" type="button" onClick={handleRemove}>
          remove
        </Button>
      ) : null}
      <h2>comments</h2>
      <form onSubmit={handleCreateComment}>
        <input
          type="text"
          value={comment}
          onChange={e => setComment(e.target.value)}
          name="comment"
          placeholder="comment..."
        />
        <Button backgroundColor="green">add comment</Button>
      </form>
      <ul>
        {blog.comments &&
          blog.comments.map(comment => <li key={comment.id}>{comment.text}</li>)}
      </ul>
    </>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
  loggedInUser: PropTypes.object.isRequired,
};

export default Blog;
