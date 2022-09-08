import React from 'react';
import Auth from './utils/auth';
import './hamburger.css'

// Here we are using object destructuring assignment to pluck off our variables from the props object
// We assign them to their own variable names
function Nav({ currentPage, handlePageChange }) {
  return (
    <>
      <nav id="main-menu">
        <div role="menuitem" className="menuitem" onClick={() => handlePageChange('About')}>Home</div>
        <div role="menuitem" className="menuitem" onClick={() => handlePageChange('CreateProfile')}>Profile</div>
        <div role="menuitem" className="menuitem" onClick={() => handlePageChange('InviteBuddy')}>Buddies</div>
        <div role="menuitem" className="menuitem" onClick={() => handlePageChange('BuildGroup')}>Groups</div>
        <div role="menuitem" className="menuitem" onClick={() => handlePageChange('Messages')}>Messages</div>
        <div>
          {Auth.loggedIn() ? (
            <div role="menuitem" className="menuitem" onClick={() => Auth.logout()}>Logout</div>
          ) : (
          <>
            <div role="menuitem" className="menuitem" onClick={() => handlePageChange('LoginForm')}>Login</div>
            <div role="menuitem" className="menuitem" onClick={() => handlePageChange('SignupForm')}>Signup</div>
          </>
          )}
        </div>
      </nav>
    <input type="checkbox" id="hamburger-input" className="burger-show" />
    <label id="hamburger-menu" htmlFor="hamburger-input">
      <nav id="sidebar-menu">
        <div role="menuitem" className="menuitem" onClick={() => handlePageChange('About')}>Home</div>
        <div role="menuitem" className="menuitem" onClick={() => handlePageChange('CreateProfile')}>Profile</div>
        <div role="menuitem" className="menuitem" onClick={() => handlePageChange('InviteBuddy')}>Buddies</div>
        <div role="menuitem" className="menuitem" onClick={() => handlePageChange('BuildGroup')}>Groups</div>
        <div role="menuitem" className="menuitem" onClick={() => handlePageChange('Messages')}>Messages</div>
        <div>
          {Auth.loggedIn() ? (
            <div role="menuitem" className="menuitem" onClick={() => Auth.logout()}>Logout</div>
          ) : (
          <>
            <div role="menuitem" className="menuitem" onClick={() => handlePageChange('LoginForm')}>Login</div>
            <div role="menuitem" className="menuitem" onClick={() => handlePageChange('SignupForm')}>Signup</div>
          </>
          )}
        </div>
      </nav>
    </label>
    <div className="overlay"></div>
    </>
  )
}

export default Nav;

