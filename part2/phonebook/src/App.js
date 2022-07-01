import { useState, useEffect } from "react";
import axios from "axios";
import Persons from "./Persons";
import PersonForm from "./PersonForm";
import Filter from "./Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(res => res.data)
      .then(data => setPersons(data));
  }, []);

  const addToPhonebookHandler = e => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    if (persons.some(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to your phonebook`);
      return;
    }
    setPersons([...persons, newPerson]);
  };

  const newNameHandler = e => {
    setNewName(e.target.value);
  };

  const newNumberHandler = e => {
    setNewNumber(e.target.value);
  };

  const nameFilterHandler = e => {
    setNameFilter(e.target.value);
  };

  const filteredPersons = nameFilter
    ? persons.filter(person =>
        person.name.toLowerCase().includes(nameFilter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} nameFilterHandler={nameFilterHandler} />
      <h2>add a new</h2>
      <PersonForm
        addToPhonebookHandler={addToPhonebookHandler}
        newNameHandler={newNameHandler}
        newNumberHandler={newNumberHandler}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
