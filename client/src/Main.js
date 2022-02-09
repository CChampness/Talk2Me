import React, { useState } from 'react';
import About from './pages/About';
import Resume from './pages/Resume';
import Blog from './pages/Blog';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import FindBuddies from './pages/FindBuddies';
import CreateProfile from './pages/CreateProfile';
// import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';

function Main({ currentPage, setCurrentPage}) {

  const handleChange = (page) => setCurrentPage(page);

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <Resume />;
      case 'About':
        return <About />;
      case 'Blog':
        return <Blog />;
      case 'SignupForm':
        return <SignupForm />;
      case 'LoginForm':
        return <LoginForm />;
      case 'FindBuddies':
        return (
          <section className="row justify-center">
            <FindBuddies />
          </section>
        );
      case 'CreateProfile':
        return <CreateProfile />;
      // case 'Projects':
      //   return (
      //     <section className="row justify-center">
      //       <h3>Portfolio</h3>
      //       <Projects  currentPage={currentPage} handleChange={handleChange}/>
      //     </section>
      //   );
      default:
        return <Resume />
    }
  };

  return (
    <main>
      <hr/>
      {renderPage()}
    </main>
  );
}

export default Main;
