import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";

import fetchData from "../helpers/fetch-data";
import "./Movie.scss";

const dummyURL = "/dummy-movies.json";
const apiKey = import.meta.env.VITE_API_KEY;

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  const apiURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

  // fetch data on load
  useEffect(() => {
    fetchData(apiURL).then(setMovie).catch(setError);
  }, []);

  // Render error message if fetch fails
  if (error) return <ErrorMessage error={error} title={`movie ${id}`} />;

  // Successful fetch JSX
  if (movie) {
    return (
      <section className="movie-section">
        <h1>{movie.title}</h1>
      </section>
    );
  }

  // Loading...
  return <Loading />;
}

export default Movie;
