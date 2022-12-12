import { Link } from "react-router-dom";

function QuickSearchResult({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <article className="quick-search__result">
        <div className="img-container">
          <img
            src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
            alt={`Movie poster for: ${movie.title}`}
          />
        </div>
        <div className="info-container">
          <h3>{movie.title}</h3>
          <p>Rating: {movie.vote_average}</p>
          <p>{movie.release_date.split("-")[0]}</p>
        </div>
      </article>
    </Link>
  );
}

export default QuickSearchResult;
