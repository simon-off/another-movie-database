import { NavLink } from "react-router-dom";

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
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search AMDb"
            aria-label="Search AMDb"
          />
          <button type="submit">Search</button>
        </form>
      </nav>
    </header>
  );
}

export default Navbar;
