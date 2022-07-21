import { useEffect, useState } from "react";
import { useQuery, useSubscription, useApolloClient } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "../queries";
import { updateCache } from "../App";

const Books = props => {
  const [genres] = useState([]);
  const [books, setBooks] = useState([]);
  const [genreFilter, setGenreFilter] = useState("all-genres");
  const client = useApolloClient();

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: genreFilter === "all-genres" ? "" : genreFilter },
  });

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`${addedBook.title} added`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result.data]);

  useEffect(() => {
    if (result.data) {
      for (let book of result.data.allBooks) {
        for (let genre of book.genres) {
          if (!genres.includes(genre)) {
            genres.push(genre);
          }
        }
      }
    }
  }, [result.data, genres]);

  if (!props.show) {
    return null;
  }
  return (
    <div>
      <h2>books</h2>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.map(a => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(genre => (
        <button key={genre} onClick={() => setGenreFilter(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenreFilter("all-genres")}>all genres</button>
    </div>
  );
};

export default Books;
