import React, { useState } from 'react';
// import { useMutation, useQuery } from '@apollo/client';
import Nav from './Nav';
// import { GET_ME } from './utils/queries';

function Header({ currentPage, setCurrentPage }) {
  // const {loading, error, data } = useQuery(GET_ME);


  const handlePageChange = (page) => {
    setCurrentPage(page)
  };

  let message = "Welcome, ";

  // if (loading) return <h4>Loading...</h4>;
  // if (error) return <h4>Error! {error.message}</h4>;
  // console.log("in Header, data: ", data);
  const user = localStorage.getItem("id_name");
  if (user) {
    message += user;
  }
     
  return (
    <header>
      <h1>Talk 2 Me</h1>
      <h3 id="headerMsg">{message}</h3>
      <div className="NavTabs div">
        {/* Pass the currentPage from state and the function to update it */}
        <Nav currentPage={currentPage} handlePageChange={handlePageChange} />
      </div>
    </header>
  );
}

export default Header;