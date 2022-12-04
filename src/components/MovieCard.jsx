import "./MovieCard.scss";

function MovieCard({ movie, index, sectionId }) {
  return (
    <article className="movie-card" id={sectionId + index}>
      <div className="movie-card__content">
        <div className="img-container">
          <img src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt="" />
        </div>
        <h3>{movie.title}</h3>
      </div>
    </article>
  );
}

export default MovieCard;
