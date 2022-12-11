// Node modules
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

// Local files
import useFetch from "../hooks/useFetch";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";
import MovieCard from "./MovieCard";
import "./MovieListSection.scss";

// Global variables
const dummyURL = "dummy-movies.json";
const apiKey = import.meta.env.VITE_API_KEY;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// MovieListSection Component
function MovieListSection(props) {
  const apiURL = `https://api.themoviedb.org/3${props.urlEndpoint}?api_key=${apiKey}`;

  const { data: movies, error, loading } = useFetch(dummyURL);
  const [atSide, setAtSide] = useState("left");
  const movieListRef = useRef();

  // function to handle left and right scroll buttons
  const handleScrollButtonsClick = (direction) => {
    const columns = window.getComputedStyle(movieListRef.current).getPropertyValue("--columns");
    const columnWidth = movieListRef.current.scrollWidth / movies.results.length;
    const currentColumn = Math.round(movieListRef.current.scrollLeft / columnWidth);

    let targetScrollPosition = clamp(
      currentColumn + columns * direction,
      0,
      movies.results.length - columns
    );

    const targetCard = document.getElementById(props.id + targetScrollPosition);
    targetCard.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  };

  // function to check if at edge of scroll box
  const handleScrollEvent = (e) => {
    if (e.target.scrollLeft < 50) {
      setAtSide("left");
    } else if (e.target.scrollLeft > e.target.scrollLeftMax - 50) {
      setAtSide("right");
    } else {
      setAtSide("middle");
    }
  };

  // Render loading...
  if (loading) return <Loading />;

  // Render error message if fetch fails
  if (error) return <ErrorMessage error={error} title={props.title} />;

  // Render if successful fetch
  if (movies) {
    return (
      <section className="movie-list-section">
        <h2 className="section-title">{props.title}</h2>
        <div className="movie-list-controls">
          <button
            onClick={() => handleScrollButtonsClick(-1)}
            className={`scroll-btn scroll-btn__left ${atSide === "left" ? "disabled" : ""}`}
            aria-label="Scroll movie list left"
          >
            {/* Purely decorative icon. Buttons are labeled */}
            <FaChevronLeft aria-hidden="true" />{" "}
          </button>
          <button
            onClick={() => handleScrollButtonsClick(1)}
            className={`scroll-btn scroll-btn__right ${atSide === "right" ? "disabled" : ""}`}
            aria-label="Scroll movie list right"
          >
            {/* Purely decorative icon. Buttons are labeled */}
            <FaChevronRight aria-hidden="true" />
          </button>
          <div ref={movieListRef} onScroll={handleScrollEvent} className="movie-list">
            {movies.results.map((movie, index) => {
              return <MovieCard key={movie.id} movie={movie} index={index} sectionId={props.id} />;
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default MovieListSection;
