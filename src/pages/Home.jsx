import MovieListSection from "../components/MovieListSection";
import useFetch from "../hooks/useFetch";
import "./Home.scss";

// Global variables
const dummyURL = "dummy-movies.json";
const apiKey = import.meta.env.VITE_API_KEY;

const popularURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
const upcomingURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;
const topRatedURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;

function Home({ recentlyViewed, setRecentlyViewed }) {
  const popular = useFetch(popularURL);
  const upcoming = useFetch(upcomingURL);
  const topRated = useFetch(topRatedURL);

  return (
    <>
      <MovieListSection
        movies={popular.data}
        error={popular.error}
        loading={popular.loading}
        title="Popular right now"
        sectionId="popular"
      />
      <MovieListSection
        movies={upcoming.data}
        error={upcoming.error}
        loading={upcoming.loading}
        title="Upcoming"
        sectionId="upcoming"
      />
      <MovieListSection
        movies={topRated.data}
        error={topRated.error}
        loading={topRated.loading}
        title="Top rated"
        sectionId="top"
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
