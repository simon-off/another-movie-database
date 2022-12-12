// import useSearchFetch from "../hooks/useSearchFetch";
import useFetch from "../hooks/useFetch";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";
import QuickSearchResult from "./QuickSearchResult";
import "./QuickSearch.scss";

const dummyURL = "dummy-movies.json";
const apiKey = import.meta.env.VITE_API_KEY;

function SearchResults({ searchValue, setSearchValue }) {
  const apiURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

  // const { data, error, loading } = useSearchFetch(apiURL, searchValue);
  const { data, error, loading } = useFetch(dummyURL);
  let splicedMovies = [];

  if (data) {
    const sortedMovies = data.results.sort((a, b) => b.popularity - a.popularity);
    splicedMovies = sortedMovies.length >= 5 ? sortedMovies.slice(0, 6) : sortedMovies;
  }

  return (
    <div
      className={searchValue ? "quick-search show" : "quick-search"}
      onClick={() => setSearchValue("")}
    >
      {error ? <ErrorMessage error={error} title={searchValue} /> : null}
      {splicedMovies.length > 0 ? (
        <div>
          {splicedMovies.map((movie) => (
            <QuickSearchResult key={movie.id} movie={movie} />
          ))}
          <p className="p-half-prem">See all results for "{searchValue}"</p>
        </div>
      ) : (
        <p className="p-half-prem">No results for {searchValue}</p>
      )}
      {loading ? <Loading /> : null}
    </div>
  );
}

export default SearchResults;
