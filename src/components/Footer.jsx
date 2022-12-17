import "./Footer.scss";
import tmdbLogo from "../assets/svg/tmdb-logo.svg";

function Footer() {
  return (
    <footer className="footer">
      <div>
        <img src={tmdbLogo} alt="" />
        <p className="disclaimer">
          This product uses the{" "}
          <a href="https://developers.themoviedb.org/3" target="_blank">
            TMDB API
          </a>{" "}
          but is not endorsed or certified by TMDB.
        </p>
        <span className="disclaimer">
          made by: <a href="https://github.com/simon-off">simonoff</a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
