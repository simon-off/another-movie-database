import MovieListSection from "../components/MovieListSection";

function Home({ recentlyViewed }) {
  return (
    <>
      <MovieListSection urlEndpoint="/movie/top_rated" title="Top rated" id="top" />
      <MovieListSection urlEndpoint="/movie/popular" title="Popular right now" id="popular" />
    </>
  );
}

export default Home;
