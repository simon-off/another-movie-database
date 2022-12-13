import MovieListSection from "../components/MovieListSection";
import useFetch from "../hooks/useFetch";
import "./Home.scss";

// Global variables
const dummyURL = "dummy-movies.json";
const apiKey = import.meta.env.VITE_API_KEY;

const topRatedURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;
const popularURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

function Home({ recentlyViewed, setRecentlyViewed }) {
  const topRated = useFetch(topRatedURL);
  const popular = useFetch(popularURL);

  return (
    <>
      <MovieListSection
        movies={topRated.data}
        error={topRated.error}
        loading={topRated.error}
        title="Top rated"
        sectionId="top"
      />
      <MovieListSection
        movies={popular.data}
        error={popular.error}
        loading={popular.error}
        title="Popular right now"
        sectionId="popular"
      />
      {recentlyViewed.length > 0 ? (
        <>
          <MovieListSection
            movies={{ results: recentlyViewed }}
            title="Recently viewed"
            sectionId="recent"
          />
          <button className="btn" onClick={() => setRecentlyViewed([])}>
            Clear recently viewed movies
          </button>
        </>
      ) : null}
    </>
  );
}

export default Home;
