import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import QuickSearch from "./QuickSearch";
import "./Header.scss";
import { useEffect } from "react";
import { useRef } from "react";

function Navbar() {
  const [searchValue, setSearchValue] = useState("");
  const [searchInputFocused, setSearchInputFocused] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef();

  const handleSubmit = (e) => {
    if (searchValue) {
      e.preventDefault();
      setSearchInputFocused(false);
      navigate(`/search/${searchValue}`);
    }
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!formRef.current) return;
      if (!formRef.current.contains(e.target)) setSearchInputFocused(false);
    });
  }, []);

  return (
    <header className="header">
      <nav>
        <NavLink to="/" className="logo">
          AMDb
        </NavLink>
        <form onSubmit={handleSubmit} className="search-form" ref={formRef}>
          <input
            value={searchValue}
            onChange={(e) => {
              setSearchInputFocused(true);
              setSearchValue(e.target.value);
            }}
            onFocus={() => setSearchInputFocused(true)}
            type="text"
            name="search"
            id="search"
            size="10"
            placeholder="Search AMDb"
            aria-label="Search AMDb"
            autoComplete="off"
          />
          <button type="submit" title="Submit search" id="search-btn">
            <FaSearch aria-labelledby="search-btn" />
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
