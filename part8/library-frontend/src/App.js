import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Reccomendations from "./components/Reccomendations";
import { useApolloClient, useQuery } from "@apollo/client";
import Notification from "./components/Notification";
import { GET_FAVOURITE_GENRE } from "./queries";

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = a => {
    let seen = new Set();
    return a.filter(item => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [favouriteGenre, setFavouriteGenre] = useState("");
  const client = useApolloClient();

  const result = useQuery(GET_FAVOURITE_GENRE);

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  useEffect(() => {
    if (localStorage.getItem("library-user-token")) {
      setToken(localStorage.getItem("library-user-token"));
    }
  }, []);

  useEffect(() => {
    if (result.data) {
      setFavouriteGenre(result.data.me.favouriteGenre);
    }
  }, [result.data]);

  return (
    <div>
      <Notification errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("reccomendations")}>
              reccomendations
            </button>
            <button onClick={handleLogout}>logout</button>
          </>
        )}
        {!token && <button onClick={() => setPage("login")}>login</button>}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Reccomendations
        favouriteGenre={favouriteGenre}
        show={page === "reccomendations"}
      />

      <LoginForm
        setErrorMessage={setErrorMessage}
        setToken={setToken}
        show={page === "login"}
      />
    </div>
  );
};

export default App;
