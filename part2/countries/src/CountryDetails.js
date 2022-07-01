import { useState, useEffect } from "react";
import Weather from "./Weather";

const CountryDetails = ({ country, show }) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setShowDetails(show);
  }, [show]);

  if (showDetails) {
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>capital: {country.capital}</p>
        <p>area: {country.area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`flag of ${country.name.official}`} />
        <Weather capital={country.capital} />
      </>
    );
  }

  return (
    <div>
      {country.name.common}{" "}
      <button onClick={() => setShowDetails(!showDetails)}>show</button>
    </div>
  );
};
export default CountryDetails;
