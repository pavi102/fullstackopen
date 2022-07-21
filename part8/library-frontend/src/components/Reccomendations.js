import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_BOOKS } from "../queries";

const Reccomendations = ({ show, favouriteGenre }) => {
  const [books, setBooks] = useState([]);
  const result = useQuery(ALL_BOOKS, {
    variables: { genre: favouriteGenre },
  });

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result.data]);

  if (!show) {
    return null;
  }

  return (
    <div>
      <h1>Reccomendations</h1>
      <p>Books in your favourite genre {favouriteGenre}</p>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Reccomendations;
