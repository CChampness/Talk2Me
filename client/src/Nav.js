import React, { useState } from 'react';
import Auth from './utils/auth';

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function Nav({ currentPage, handlePageChange }) {
  // if (Auth.loggedIn()) {
  //   return (
  //     <nav>
  //       <a onClick={() => handlePageChange('About')}>Home</a>
  //       <a onClick={() => handlePageChange('CreateProfile')}>Profile</a>
  //       <a onClick={() => handlePageChange('FindBuddies')}>Buddies</a>
  //       <a onClick={() => handlePageChange('GetMessages')}>Messages</a>
  //       <a onClick={() => handlePageChange('Logoff')}>{Auth.logout()}</a>
  //     </nav>
  //   )
  // } else {
    return (
      <nav>
        <a onClick={() => handlePageChange('About')}>Home</a>
        <a onClick={() => handlePageChange('CreateProfile')}>Profile</a>
        <a onClick={() => handlePageChange('FindBuddies')}>Buddies</a>
        <a onClick={() => handlePageChange('GetMessages')}>Messages</a>
        <a onClick={() => handlePageChange('SignupForm')}>Signup</a>
        <a onClick={() => handlePageChange('LoginForm')}>Login</a>
      </nav>
    )
  // }
}

export default Nav;
