import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR } from "../queries";
const EditAuthor = ({ authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  useEffect(() => {
    setName(authors[0].name);
  }, [authors]);

  const [editAuthor] = useMutation(EDIT_AUTHOR);
  const handleChangeYear = e => {
    e.preventDefault();
    editAuthor({ variables: { name, born: Number(born) } });
    setName("");
    setBorn("");
  };

  return (
    <div>
      <h1>Set Birth Year</h1>
      <form onSubmit={handleChangeYear}>
        name
        <select value={name} onChange={e => setName(e.target.value)}>
          {authors.map(author => (
            <option key={author.id} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        born
        <input
          value={born}
          type={"number"}
          onChange={e => setBorn(e.target.value)}
        />
        <button onClick={handleChangeYear}>update author</button>
      </form>
    </div>
  );
};
export default EditAuthor;
