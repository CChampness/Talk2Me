import React from 'react';
import Nav from './Nav';

function Header({ currentPage, setCurrentPage }) {

  const handlePageChange = (page) => {
    setCurrentPage(page)
  };

  return (
    <header>
      <h1>Talk-2-Me</h1>
      {/* <h4 id="headerMsg">Welcome!</h4> */}
      <div className="NavTabs div">
        {/* Pass the currentPage from state and the function to update it */}
        <Nav currentPage={currentPage} handlePageChange={handlePageChange} />
      </div>
    </header>
  );
}

export default Header;