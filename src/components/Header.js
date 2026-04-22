import React from "react";

function Header() {
  return (
    <header className="header" role="banner">
      <div className="header-content">
        <h1>🍋 Little Lemon</h1>
        <p>Chicago</p>
        <nav aria-label="Main navigation">
          <a href="#booking">Reserve a Table</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
