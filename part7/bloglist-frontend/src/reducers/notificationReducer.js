import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null, className: "" };
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    _setNotification(state, action) {
      const { message, className } = action.payload;
      state.message = message;
      state.className = className;
    },
    removeNotification(state) {
      state.message = null;
      state.className = "";
    },
  },
});

const { _setNotification, removeNotification } = notificationSlice.actions;

let timeoutId;

export const setNotification =
  (notification, delayInSeconds = 5) =>
  async dispatch => {
    dispatch(_setNotification(notification));
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      dispatch(removeNotification());
    }, delayInSeconds * 1000);
  };

export default notificationSlice.reducer;
