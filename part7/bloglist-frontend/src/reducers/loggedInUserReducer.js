import { createSlice } from "@reduxjs/toolkit";

const loggedInUserSlice = createSlice({
  name: "loggedInUser",
  initialState: null,
  reducers: {
    setLoggedInUser(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { setLoggedInUser } = loggedInUserSlice.actions;
export default loggedInUserSlice.reducer;
