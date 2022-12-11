import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "./MovieCard.scss";

const drawStars = (rating) => {
  const roundedRating = Math.round(rating);
  const starPos = Math.floor(roundedRating / 2);

  let stars = [];

  for (let i = 0; i < 10; i += 2) {
    if (i < roundedRating) {
      stars.push(<FaStar key={i} aria-hidden="true" />);
      continue;
    }
    stars.push(<FaRegStar key={i} aria-hidden="true" />);
  }
  if (roundedRating % 2 != 0) {
    stars.splice(starPos, 1, <FaStarHalfAlt key={"half"} aria-hidden="true" />);
  }

  return stars;
};

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
          <img
            src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
            alt={`Movie poster for: ${movie.title}`}
          />
        </div>
        <div className="info-container">
          <span className="info-container__stars">
            {drawStars(movie.vote_average)}
            <span aria-label="Average movie rating">{movie.vote_average}</span>
          </span>
          <p tabIndex="-1" id={sectionId + movie.id}>
            {movie.title}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
