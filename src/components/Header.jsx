import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./Header.scss";
import QuickSearch from "./QuickSearch";
import { useRef } from "react";

function Navbar() {
  const [searchValue, setSearchValue] = useState("");
  const [searchInputFocused, serSearchInputFocused] = useState(false);

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
            onFocus={() => serSearchInputFocused(true)}
            onBlur={() => serSearchInputFocused(false)}
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
      <QuickSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchInputFocused={searchInputFocused}
      />
    </header>
  );
}

export default Navbar;
