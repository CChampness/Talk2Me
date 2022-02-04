import React, { useState } from 'react';
import Nav from './Nav';

function Header({ currentPage, setCurrentPage }) {

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <header>
      <h1>Talk 2 Me</h1>
      <div className="NavTabs div">
        {/* We are passing the currentPage from state and the function to update it */}
        <Nav currentPage={currentPage} handlePageChange={handlePageChange} />
      </div>
    </header>
  );
}

export default Header;