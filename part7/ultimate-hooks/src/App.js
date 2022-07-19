import { useState, useEffect } from "react";
import axios from "axios";

const useField = type => {
  const [value, setValue] = useState("");

  const onChange = event => {
    setValue(event.target.value);
  };
  const reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    reset,
  };
};

const useResource = baseUrl => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      const res = await axios.get(baseUrl);
      setResources(res.data);
    };
    getAll();
  }, [baseUrl]);

  const create = async resource => {
    const res = await axios.post(baseUrl, resource);
    setResources([...resources, res.data]);
  };

  const service = {
    create,
  };

  return [resources, service];
};

const App = () => {
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetName, ...name } = useField("text");
  const { reset: resetNumber, ...number } = useField("text");

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  const handleNoteSubmit = event => {
    event.preventDefault();
    resetContent();
    noteService.create({ content: content.value });
  };

  const handlePersonSubmit = event => {
    event.preventDefault();
    resetName();
    resetNumber();
    personService.create({ name: name.value, number: number.value });
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;