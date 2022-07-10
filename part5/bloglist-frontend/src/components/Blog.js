import { useState } from "react";
import PropTypes from "prop-types";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};
const Blog = ({ user, blog, likeBlog, deleteBlog }) => {
  const [toggleDetails, setToggleDetails] = useState(false);
  return (
    <div data-cy="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={() => setToggleDetails(!toggleDetails)}>View</button>
        {toggleDetails && (
          <div>
            {blog.url}
            <br />
            likes: {blog.likes}{" "}
            <button onClick={() => likeBlog(blog.id)}>like</button>
            <br />
            {blog.user.name}
            <br />
            {blog.user.id === user.id && (
              <button onClick={() => deleteBlog(blog.id)}>remove</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
