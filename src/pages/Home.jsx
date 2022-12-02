import MovieListSection from "../components/MovieListSection";

function Home() {
  return (
    <section>
      <MovieListSection urlEndpoint="/movie/top_rated" title="Top rated" />
      {/* <MovieListSection urlEndpoint="/movie/popular" title="Popular right now" /> */}
    </section>
  );
}

export default Home;
