import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header id="header">
      <div>
        <a href className="brand">
          TENET
        </a>
      </div>
      <div>
        <a href className="category">
          WATCHES
        </a>
        <a href className="category">
          BESTSELLERS
        </a>
        <a href className="category">
          DIWALI SALE
        </a>
        <a href="\products" className="category">
          PRODUCTS
        </a>
      </div>
      <div>
        <a className="search-btn" href="\search">
          <i className="fa fa-search" aria-hidden="true"></i>
        </a>
        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
        <i className="fa fa-heart" aria-hidden="true"></i>
        <i className="fa fa-user" aria-hidden="true"></i>
      </div>
    </header>
  );
};

export default Header;

/**
 *       <div class="search">
        <input type="text" class="searchTerm" placeholder="Search..." />
        <button type="submit" class="searchButton">
          <i class="fa fa-search"></i>
        </button>
      </div>
 */
