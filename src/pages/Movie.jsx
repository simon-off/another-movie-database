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
    if (movie) {
      const newMovie = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
      };

      if (!recentlyViewed.some((viewedMovie) => viewedMovie.id === movie.id)) {
        setRecentlyViewed([newMovie, ...recentlyViewed].slice(0, 11));
      } else {
        const filteredMovies = recentlyViewed.filter((filtered) => filtered.id !== movie.id);
        setRecentlyViewed([newMovie, ...filteredMovies].slice(0, 11));
      }
    }
  }, [movie]);

  // Render loading...
  if (loading) return <Loading />;

  // Render error message if fetch fails
  if (error) return <ErrorMessage error={error} title={`movie ${id}`} />;

  // Render if successful fetch
  if (movie) {
    console.log(movie);
    return (
      <section className="movie-section">
        <div>
          <h2>{movie.title || null}</h2>
          <p>{movie.runtime || null} minutes</p>
          <p>{movie.tagline || null}</p>
          <p>{movie.overview || null}</p>
          <ul>
            {movie.genres
              ? movie.genres.map((genre) => <li key={genre.key}>{genre.name}</li>)
              : null}
          </ul>
        </div>
      </section>
    );
  }
}

export default Movie;
