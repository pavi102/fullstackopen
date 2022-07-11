import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const sortAnecdotes = anecdotes => {
  return [...anecdotes].sort((a, b) => b.votes - a.votes);
};

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const upvotedAnecdote = action.payload;
      const anecdotes = state.map(anecdote =>
        anecdote.id === upvotedAnecdote.id ? upvotedAnecdote : anecdote
      );
      return sortAnecdotes(anecdotes);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = content => async dispatch => {
  const newAnecdote = await anecdoteService.create(content);
  dispatch(appendAnecdote(newAnecdote));
};

export const upvoteAnecdote = anecdote => async dispatch => {
  const upvotedAnecdote = await anecdoteService.upvoteAnecdote(anecdote);
  dispatch(voteAnecdote(upvotedAnecdote));
};

export default anecdoteSlice.reducer;
