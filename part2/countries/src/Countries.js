import CountryDetails from "./CountryDetails";

const Countries = ({ countries, searchTerm }) => {
  if (countries.length === 1 && searchTerm) {
    return <CountryDetails country={countries[0]} show={true} />;
  }

  if (countries.length > 10 && searchTerm) {
    return <p>Too many matches, please specify another filter</p>;
  }

  if (countries.length <= 10) {
    return (
      <ul>
        {countries.map(country => {
          return (
            <CountryDetails
              key={country.name.official}
              country={country}
              show={false}
            />
          );
        })}
      </ul>
    );
  }

  return null;
};
export default Countries;
