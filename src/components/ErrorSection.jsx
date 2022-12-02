function ErrorSection({ error }) {
  return (
    <section className="movie-list-section">
      <h2>Something went wrong... 😔</h2>
      <p>
        {error.status}: {error.statusText}
      </p>
    </section>
  );
}

export default ErrorSection;
