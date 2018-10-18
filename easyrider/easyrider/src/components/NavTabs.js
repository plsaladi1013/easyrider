import React from "react";

const NavTabs = props => (
  <ul className="nav nav-tabs">
    <li className="nav-item">
      <a
        onClick={() => props.handlePageChange("Home")}
        className={
          props.currentPage === "Home" ? "nav-link active" : "nav-link"
        }
      >
        Home
      </a>
    </li>
    <li className="nav-item">
      <a
        onClick={() => props.handlePageChange("Uber")}
        className={
          props.currentPage === "Uber" ? "nav-link active" : "nav-link"
        }
      >
        Uber
      </a>
    </li>
    <li className="nav-item">
      <a
        onClick={() => props.handlePageChange("Lyft")}
        className={
          props.currentPage === "Lyft" ? "nav-link active" : "nav-link"
        }
      >
        Lyft
      </a>
    </li>
    <li className="nav-item">
      <a
        onClick={() => props.handlePageChange("Weather")}
        className={
          props.currentPage === "Weather" ? "nav-link active" : "nav-link"
        }
      >
        Weather
      </a>
    </li>
  </ul>
);

export default NavTabs;
