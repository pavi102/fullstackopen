import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleCreate = async e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";

    dispatch(createAnecdote(content));
    dispatch(setNotification(`You created anecdote "${content}"`, 5));
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
