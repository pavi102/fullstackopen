import { createSlice } from "@reduxjs/toolkit";

const initialState = { text: null };
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    changeNotifcation(state, action) {
      state.text = action.payload;
    },
    removeNotification(state) {
      state.text = null;
    },
  },
});

export const { changeNotifcation, removeNotification } = notificationSlice.actions;

export const setNotification = (content, delayInSeconds) => async dispatch => {
  dispatch(changeNotifcation(content));
  setTimeout(() => {
    dispatch(removeNotification());
  }, delayInSeconds * 1000);
};
export default notificationSlice.reducer;
