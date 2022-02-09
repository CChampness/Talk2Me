import React, { useState } from 'react';
// import Navbar from './components/Navbar';
import Nav from './Nav';

function Header({ currentPage, setCurrentPage }) {

  const handlePageChange = (page) => {
    setCurrentPage(page)
  };

  return (
    <header>
      <h1>Talk 2 Me</h1>
      <h3>Welcome, {localStorage.getItem("id_name")}</h3>
      <div className="NavTabs div">
        {/* Pass the currentPage from state and the function to update it */}
        <Nav currentPage={currentPage} handlePageChange={handlePageChange} />
      </div>
    </header>
  );
}

export default Header;