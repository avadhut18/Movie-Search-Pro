import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="site-header">
      <Link to="/" className="site-header__brand">
        <span className="site-header__mark">M</span>
        <span className="site-header__name">Marquee</span>
      </Link>
    </header>
  );
};

export default Header;
