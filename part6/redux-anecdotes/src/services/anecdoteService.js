import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async content => {
  const newAnecdote = { content, votes: 0 };
  const res = await axios.post(baseUrl, newAnecdote);
  return res.data;
};

const upvoteAnecdote = async anecdote => {
  const upvotedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const res = await axios.put(`${baseUrl}/${anecdote.id}`, upvotedAnecdote);
  return res.data;
};

const exports = { getAll, create, upvoteAnecdote };

export default exports;
