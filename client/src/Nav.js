import React from 'react';
import Auth from './utils/auth';

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function Nav({ currentPage, handlePageChange }) {
  return (
    <nav>
      <a onClick={() => handlePageChange('About')}>Home</a>
      <a onClick={() => handlePageChange('CreateProfile')}>Profile</a>
      <a onClick={() => handlePageChange('InviteBuddy')}>Buddies</a>
      <a onClick={() => handlePageChange('BuildGroup')}>Groups</a>
      <a onClick={() => handlePageChange('Messages')}>Messages</a>
      <div>
        {Auth.loggedIn() ? (
          <a onClick={() => Auth.logout()}>Logout</a>
        ) : (
        <>
          <a onClick={() => handlePageChange('LoginForm')}>Login</a>
          <a onClick={() => handlePageChange('SignupForm')}>Signup</a>
        </>
        )}
      </div>
    </nav>
  )
}

export default Nav;

