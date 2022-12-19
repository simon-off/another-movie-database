import { useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import QuickSearchResult from "../components/QuickSearchResult";
import useSearchFetch from "../hooks/useSearchFetch";

const apiKey = import.meta.env.VITE_API_KEY;
const apiURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

function SearchResults() {
  const { query } = useParams();
  const { data, error, loading } = useSearchFetch(apiURL, query);

  let sortedMovies = [];

  if (data) {
    if (data.results) {
      sortedMovies = data.results.sort((a, b) => b.popularity - a.popularity);
    }
  }

  // Render loading...
  if (loading) return <Loading />;

  // Render error message if fetch fails
  if (error) return <ErrorMessage error={error} title={title} />;

  if (data) {
    return (
      <section>
        <h2 className="p-half-prem">Search results for: "{query}"</h2>
        <hr />
        {sortedMovies.length > 0 ? (
          <div>
            {sortedMovies.map((movie) => (
              <QuickSearchResult key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="p-half-prem">No results for "{query}"</p>
        )}
      </section>
    );
  }
}

export default SearchResults;
