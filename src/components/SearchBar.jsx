import React from "react";
import "./SearchBar.css";

/**
 * A fully controlled search input. It intentionally does NOT fetch
 * anything itself — it just reports the raw keystroke value upward.
 * Debouncing and fetching are handled by the useMovieSearch hook,
 * which keeps this component simple and reusable.
 */
const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        placeholder="Search for a movie, e.g. Interstellar"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search for a movie"
        autoFocus
      />
    </div>
  );
};

export default SearchBar;
