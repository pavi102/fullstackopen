import { createSlice } from "@reduxjs/toolkit";

const initialState = { text: null };
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      state.text = action.payload;
    },
    removeNotification(state) {
      state.text = null;
    },
  },
});

export const { setNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
