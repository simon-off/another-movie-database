import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import QuickSearch from "./QuickSearch";
import "./Header.scss";

function Navbar() {
  const [searchValue, setSearchValue] = useState("");
  const [searchInputFocused, setSearchInputFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (searchValue) {
      e.preventDefault();
      setSearchInputFocused(false);
      navigate(`/search/${searchValue}`);
    }
  };

  return (
    <header className="header">
      <nav>
        <NavLink to="/" className="logo">
          AMDb
        </NavLink>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            value={searchValue}
            onChange={(e) => {
              setSearchInputFocused(true);
              setSearchValue(e.target.value);
            }}
            onFocus={() => setSearchInputFocused(true)}
            onBlur={() => setSearchInputFocused(false)}
            type="text"
            name="search"
            id="search"
            size="10"
            placeholder="Search AMDb"
            aria-label="Search AMDb"
            autoComplete="off"
          />
          <button type="submit">
            <FaSearch title="Search Icon" />
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
