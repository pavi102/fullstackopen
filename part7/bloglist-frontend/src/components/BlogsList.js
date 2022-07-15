import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { initializeBlogs } from "../reducers/blogReducer";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
};

const BlogsList = () => {
  const blogs = useSelector(state => {
    return [...state.blogs].sort((a, b) => b.likes - a.likes);
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div>
      {blogs.map(blog => (
        <Link key={blog.id} to={`/blogs/${blog.id}`}>
          <div data-cy="blog" style={blogStyle}>
            <div>
              {blog.title} {blog.author}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default BlogsList;
