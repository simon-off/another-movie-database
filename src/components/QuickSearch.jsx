import useSearchFetch from "../hooks/useSearchFetch";
import ErrorMessage from "./ErrorMessage";
import QuickSearchResult from "./QuickSearchResult";
import "./QuickSearch.scss";
import { Link } from "react-router-dom";

const apiKey = import.meta.env.VITE_API_KEY;

function QuickSearch({ searchValue, setSearchValue, searchInputFocused }) {
  const apiURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

  const { data, error, loading } = useSearchFetch(apiURL, searchValue);
  let slicedMovies = [];

  if (data) {
    if (data.results) {
      const sortedMovies = data.results.sort((a, b) => b.popularity - a.popularity);
      slicedMovies = sortedMovies.filter((a) => a.poster_path).slice(0, 6);
    }
  }

  return (
    <div
      className={searchValue && searchInputFocused ? "quick-search show" : "quick-search"}
      onClick={() => setSearchValue("")}
    >
      {error ? <ErrorMessage error={error} title={searchValue} /> : null}
      {slicedMovies.length > 0 ? (
        <div>
          {slicedMovies.map((movie) => (
            <QuickSearchResult key={movie.id} movie={movie} />
          ))}
          <Link to={`/search/${searchValue}`}>
            <p className="p-half-prem">See all results for "{searchValue}"</p>
          </Link>
        </div>
      ) : (
        <p className="p-half-prem">No results for {searchValue}</p>
      )}
    </div>
  );
}

export default QuickSearch;
