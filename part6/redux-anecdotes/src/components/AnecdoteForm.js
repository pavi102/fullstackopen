import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleCreate = e => {
    e.preventDefault();
    dispatch(createAnecdote(e.target.anecdote.value));
    dispatch(setNotification(`You created anecdote "${e.target.anecdote.value}"`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
    e.target.anecdote.value = "";
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};
export default AnecdoteForm;
