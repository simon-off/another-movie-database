import { Link } from "react-router-dom";
import "./MovieCard.scss";
import fallbackPoster from "../assets/img/poster-fallback.png";
import drawStars from "../helpers/drawStars";

function MovieCard({ movie, index, sectionId }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="movie-card"
      id={sectionId + index}
      aria-labelledby={sectionId + movie.id}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="movie-card__content">
        <div className="img-container">
          {movie.poster_path ? (
            <img
              src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
              alt={`Movie poster for: ${movie.title}`}
            />
          ) : (
            <img src={fallbackPoster} alt={movie.title} />
          )}
        </div>
        <div className="info-container">
          <span className="info-container__stars">
            {drawStars(movie.vote_average ? movie.vote_average.toFixed(1) : 0)}
            <span aria-label="Average movie rating">
              {movie.vote_average ? movie.vote_average.toFixed(1) : 0}
            </span>
          </span>
          <p tabIndex="-1" id={"p" + sectionId + movie.id}>
            {movie.title}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
