import { useDispatch } from "react-redux";
import { createAnecDote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleCreate = e => {
    e.preventDefault();
    dispatch(createAnecDote(e.target.anecdote.value));
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
