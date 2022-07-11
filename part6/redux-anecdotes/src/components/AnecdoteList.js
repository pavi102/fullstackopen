import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeAnecdotes, upvoteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector(state =>
    state.anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  );

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const vote = id => {
    const anecdote = anecdotes.find(anecdote => anecdote.id === id);
    dispatch(upvoteAnecdote(anecdote));
    dispatch(setNotification(`You voted "${anecdote.content}"`, 5));
  };

  return (
    <>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};
export default AnecdoteList;
