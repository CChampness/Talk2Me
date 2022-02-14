import React, { useState } from 'react';
// import { useMutation, useQuery } from '@apollo/client';
import Nav from './Nav';
// import { GET_ME } from './utils/queries';

function Header({ currentPage, setCurrentPage }) {
  // const {loading, error, data } = useQuery(GET_ME);


  const handlePageChange = (page) => {
    setCurrentPage(page)
  };

  // if (loading) return <h4>Loading...</h4>;
  // if (error) return <h4>Error! {error.message}</h4>;

  return (
    <header>
      <h1>Talk 2 Me</h1>
      <h4 id="headerMsg"></h4>
      <div className="NavTabs div">
        {/* Pass the currentPage from state and the function to update it */}
        <Nav currentPage={currentPage} handlePageChange={handlePageChange} />
      </div>
    </header>
  );
}

export default Header;