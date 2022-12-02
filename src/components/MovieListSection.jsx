import { useEffect, useState } from "react";
import fetchData from "../helpers/fetch-data";
import ErrorSection from "./ErrorSection";
import MovieCard from "./MovieCard";

const dummyURL = "dummy-data.json";
const apiKey = import.meta.env.VITE_API_KEY;

function MovieSection(props) {
  const apiURL = `https://api.themoviedb.org/3${props.urlEndpoint}?api_key=${apiKey}`;

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(dummyURL)
      .then((data) => setMovies(data.results))
      .catch(setError);
  }, []);

  if (error) return <ErrorSection error={error} />;

  if (movies) {
    return (
      <section className="movie-list-section">
        <h2>{props.title}</h2>
        {movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </section>
    );
  }
}

export default MovieSection;
