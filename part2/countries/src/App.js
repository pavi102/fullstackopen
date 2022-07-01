import { useState, useEffect } from "react";
import axios from "axios";

import Countries from "./Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(res => res.data)
      .then(data => setCountries(data));
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <form>
        <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      </form>
      <Countries searchTerm={searchTerm} countries={filteredCountries} />
    </>
  );
}

export default App;
