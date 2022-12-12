import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./Header.scss";
import QuickSearch from "./QuickSearch";

function Navbar() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="header">
      <nav>
        <NavLink to="/" className="logo">
          AMDb
        </NavLink>
        <form onSubmit={(e) => e.preventDefault()} className="search-form">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
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
      <QuickSearch searchValue={searchValue} setSearchValue={setSearchValue} />
    </header>
  );
}

export default Navbar;
