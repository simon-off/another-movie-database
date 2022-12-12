// Node modules
import { useEffect } from "react";
import { useParams } from "react-router-dom";

// Local files
import useFetch from "../hooks/useFetch";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import "./Movie.scss";

const dummyURL = "/dummy-movie.json";
const apiKey = import.meta.env.VITE_API_KEY;

function Movie({ recentlyViewed, setRecentlyViewed }) {
  const { id } = useParams();
  const apiURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

  const { data: movie, error, loading } = useFetch(dummyURL);

  useEffect(() => {
    if (movie) setRecentlyViewed([...recentlyViewed, { movie: movie }]);
  }, [movie]);

  // Render loading...
  if (loading) return <Loading />;

  // Render error message if fetch fails
  if (error) return <ErrorMessage error={error} title={`movie ${id}`} />;

  // Render if successful fetch
  if (movie) {
    return (
      <section className="movie-section">
        <h1>{movie.title}</h1>
      </section>
    );
  }
}

export default Movie;
