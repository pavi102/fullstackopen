import { useState } from "react";

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
    <div style={blogStyle}>
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
export default Blog;
