import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";

const usersReducer = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    _initializeUsers(state, action) {
      state = action.payload;
      return state;
    },
  },
});

const { _initializeUsers } = usersReducer.actions;

export const initalizeUsers = () => async dispatch => {
  const users = await userService.getAll();
  dispatch(_initializeUsers(users));
};

export default usersReducer.reducer;
