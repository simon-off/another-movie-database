import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./Header.scss";

const handleSearchSubmit = (e) => {
  e.preventDefault();
};

function Navbar() {
  return (
    <header className="header">
      <nav>
        <NavLink to="/" className="logo">
          AMDb
        </NavLink>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            name="search"
            id="search"
            size="10"
            placeholder="Search AMDb"
            aria-label="Search AMDb"
            autoComplete="off"
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </nav>
    </header>
  );
}

export default Navbar;
