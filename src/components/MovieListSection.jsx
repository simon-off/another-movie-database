import { useEffect, useRef, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

import fetchData from "../helpers/fetch-data";
import ErrorSection from "./ErrorSection";
import MovieCard from "./MovieCard";
import "./MovieListSection.scss";

const dummyURL = "dummy-data.json";
const apiKey = import.meta.env.VITE_API_KEY;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function MovieSection(props) {
  const apiURL = `https://api.themoviedb.org/3${props.urlEndpoint}?api_key=${apiKey}`;

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [currentScrollPosition, setCurrentScrollPosition] = useState(0);
  const [atSide, setAtSide] = useState("left");
  const movieListRef = useRef();

  useEffect(() => {
    fetchData(dummyURL)
      .then((data) => setMovies(data.results))
      .catch(setError);
  }, []);

  useEffect(() => {
    movieListRef.current.scrollTo(0, 0);
  }, []);

  const handleScroll = (direction) => {
    const end = movies.length - 1;
    const columns = window.getComputedStyle(movieListRef.current).getPropertyValue("--columns");

    let targetScrollPosition = clamp(currentScrollPosition + columns * direction, 0, end);

    // TODO: Fix the bugs with setAtSide. You should check where the scroll is actually at!
    if (targetScrollPosition > end - columns) {
      targetScrollPosition = end - columns + 1;
      setAtSide("right");
    } else if (targetScrollPosition === 0) {
      setAtSide("left");
    } else {
      setAtSide("middle");
    }

    const targetCard = document.getElementById(props.id + targetScrollPosition.toString());
    targetCard.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    setCurrentScrollPosition(targetScrollPosition);
  };

  if (error) return <ErrorSection error={error} />;

  if (movies) {
    return (
      <section className="movie-list-section">
        <h2>{props.title}</h2>
        <div className="movie-list-controls">
          <button
            onClick={() => handleScroll(-1)}
            className={`scroll-btn scroll-btn__left ${atSide === "left" ? "disabled" : ""}`}
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => handleScroll(1)}
            className={`scroll-btn scroll-btn__right ${atSide === "right" ? "disabled" : ""}`}
          >
            <FaChevronRight />
          </button>
          <div ref={movieListRef} className="movie-list">
            {movies.map((movie, index) => {
              return <MovieCard key={movie.id} movie={movie} index={index} sectionId={props.id} />;
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default MovieSection;
