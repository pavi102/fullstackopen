import { configureStore } from "@reduxjs/toolkit";
import anecoteReducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";

const store = configureStore({
  reducer: {
    anecdotes: anecoteReducer,
    notification: notificationReducer,
    filter: filterReducer,
  },
});

export default store;
