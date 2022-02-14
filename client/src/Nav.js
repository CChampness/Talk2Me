import React, { useState } from 'react';

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function Nav({ currentPage, handlePageChange }) {
  return (
    <nav>
      <a onClick={() => handlePageChange('About')}>Home</a>
      <a onClick={() => handlePageChange('CreateProfile')}>Profile</a>
      <a onClick={() => handlePageChange('FindBuddies')}>Buddies</a>
      <a onClick={() => handlePageChange('GetMessages')}>Messages</a>
      {/* <a onClick={() => handlePageChange('Blog')}>Blog</a> */}
      <a onClick={() => handlePageChange('SignupForm')}>Signup</a>
      <a onClick={() => handlePageChange('LoginForm')}>Login</a>
      {/* <a href='' className="noshow" onClick={() => handlePageChange('Wa')}></a> */}
    </nav>
  );
}

export default Nav;
