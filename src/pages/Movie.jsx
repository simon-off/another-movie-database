// Node modules
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Local files
import useFetch from "../hooks/useFetch";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import "./Movie.scss";
import drawStars from "../helpers/drawStars";
import MovieListSection from "../components/MovieListSection";

const dummyURL = "/dummy-movie.json";
const apiKey = import.meta.env.VITE_API_KEY;

function Movie({ recentlyViewed, setRecentlyViewed }) {
  const { id } = useParams();
  const apiMovieURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
  const apiRelatedURL = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}`;
  const [backdropLoaded, setBackdropLoaded] = useState(false);

  const relatedMovies = useFetch(apiRelatedURL);
  const { data: movie, error, loading } = useFetch(apiMovieURL);

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
    return (
      <>
        <section className="movie-section">
          <div className="movie-backdrop-container">
            <img
              className={backdropLoaded ? "loaded" : ""}
              onLoad={() => {
                setBackdropLoaded(true);
              }}
              src={"https://image.tmdb.org/t/p/original" + movie.backdrop_path}
              alt={movie.title}
            />
          </div>
          <div className="movie-section-content">
            <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title} />
            <div className="movie-info">
              <h2>{movie.title || null}</h2>
              <div className="movie-info__stars">
                {drawStars(movie.vote_average ? movie.vote_average.toFixed(1) : 0)}
                <span aria-label="Average movie rating">
                  {movie.vote_average ? movie.vote_average.toFixed(1) : 0}
                </span>
              </div>
              <div>
                <p>
                  Runtime: <b>{movie.runtime || null}</b> minutes
                </p>
                <p>
                  Release date: <b>{movie.release_date || null}</b>
                </p>
              </div>
              <ul>
                {movie.genres?.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
              <p className="tagline">
                <span>tagline:</span>
                <i>- {movie.tagline || null}</i>
              </p>
            </div>
            <div className="movie-description">
              <h3>Overview</h3>
              <p>{movie.overview || null}</p>
            </div>
          </div>
        </section>
        <MovieListSection
          movies={relatedMovies.data}
          error={relatedMovies.error}
          loading={relatedMovies.loading}
          title="More like this"
          sectionId="related"
        />
        {recentlyViewed.length > 0 ? (
          <>
            <MovieListSection
              movies={{ results: recentlyViewed }}
              title="Recently viewed"
              sectionId="recent"
            />
            <button className="btn z-index-1" onClick={() => setRecentlyViewed([])}>
              Clear recently viewed movies
            </button>
          </>
        ) : null}
      </>
    );
  }
}

export default Movie;
