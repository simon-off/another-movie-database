import useSearchFetch from "../hooks/useSearchFetch";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";
import "./SearchResults.scss";

const apiKey = import.meta.env.VITE_API_KEY;

function SearchResults({ searchValue }) {
  const apiURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

  const { data, error, loading } = useSearchFetch(apiURL, searchValue);

  if (data) {
    return (
      <div className={searchValue ? "search-results show" : "search-results"}>
        <h2>SEARCH RESULTS</h2>
        {error ? <ErrorMessage error={error} title={searchValue} /> : null}
        {data && data.results.length > 0 ? (
          data.results.map((movie) => {
            return <p key={movie.id}>{movie.title}</p>;
          })
        ) : (
          <p>No results for {searchValue}</p>
        )}
        {loading ? <Loading /> : null}
      </div>
    );
  }
}

export default SearchResults;
