import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "activeLink" : "";
  };

  return (
    <div className="navbar_main_div">
      <nav>
        <ul>
          <li>
            <Link to="/" className={`navbar_link ${isActive("/")}`}>
              View Movies
            </Link>
          </li>
          <li>
            <Link
              to="/addmovies"
              className={`navbar_link ${isActive("/addmovies")}`}
            >
              Add Movies
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
