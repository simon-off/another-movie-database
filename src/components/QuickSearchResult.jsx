import { Link } from "react-router-dom";
import fallbackPoster from "../assets/img/poster-fallback.png";

function QuickSearchResult({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} title={movie.title}>
      <article className="quick-search__result">
        <div className="img-container">
          {movie.poster_path ? (
            <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title} />
          ) : (
            <img src={fallbackPoster} alt={movie.title} />
          )}
        </div>
        <div className="info-container">
          <h3>{movie.title}</h3>
          <p>Rating: {movie.vote_average ? movie.vote_average : "not found"}</p>
          <p>{movie.release_date ? movie.release_date.split("-")[0] : "not found"}</p>
        </div>
      </article>
    </Link>
  );
}

export default QuickSearchResult;
