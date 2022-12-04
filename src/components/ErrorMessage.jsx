import "./ErrorMessage.scss";

function ErrorMessage({ error, title }) {
  return (
    <div className="error-message">
      <h2>
        {error.status}: {error.statusText}... 😔
      </h2>
      <p>{`Could not get data for: ${title}`}</p>
    </div>
  );
}

export default ErrorMessage;
