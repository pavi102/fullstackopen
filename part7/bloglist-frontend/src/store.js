import { configureStore } from "@reduxjs/toolkit";
import loggedInUserReducer from "./reducers/loggedInUserReducer";
import usersReducer from "./reducers/usersReducer";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    loggedInUser: loggedInUserReducer,
    users: usersReducer,
  },
});

export default store;
