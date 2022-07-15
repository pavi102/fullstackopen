import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogReducer = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    _createBlog(state, action) {
      state.push(action.payload);
    },
    _likeBlog(state, action) {
      const likedBlog = action.payload;
      return state.map(blog => (blog.id === likedBlog.id ? likedBlog : blog));
    },
    _deleteBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload);
    },
    _initializeBlogs(state, action) {
      state = action.payload;
      return state;
    },
    _createComment(state, action) {
      const commentedBlog = state.find(blog => blog.id === action.payload.blog);
      commentedBlog.comments.push(action.payload);
    },
  },
});

const { _createBlog, _likeBlog, _deleteBlog, _initializeBlogs, _createComment } =
  blogReducer.actions;

export const initializeBlogs = () => async dispatch => {
  const blogs = await blogService.getAll();
  dispatch(_initializeBlogs(blogs));
};

export const createBlog = blog => async dispatch => {
  const newBlog = await blogService.create(blog);
  dispatch(_createBlog(newBlog));
};

export const likeBlog = blog => async dispatch => {
  const blogTolike = { ...blog, likes: blog.likes + 1 };
  const likedBlog = await blogService.update(blogTolike);
  dispatch(_likeBlog(likedBlog));
};

export const deleteBlog = blog => async dispatch => {
  if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
    await blogService.remove(blog.id);
    dispatch(_deleteBlog(blog.id));
  }
};

export const createComment = (blogId, comment) => async dispatch => {
  const newComment = await blogService.createComment(blogId, comment);
  dispatch(_createComment(newComment));
};

export default blogReducer.reducer;
