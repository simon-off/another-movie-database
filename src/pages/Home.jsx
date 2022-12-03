import MovieListSection from "../components/MovieListSection";

function Home() {
  return (
    <>
      <MovieListSection urlEndpoint="/movie/top_rated" title="Top rated" />
      <MovieListSection urlEndpoint="/movie/popular" title="Popular right now" />
    </>
  );
}

export default Home;
