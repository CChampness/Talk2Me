import React, { useState } from 'react';
import About from './pages/About';
import Resume from './pages/Resume';
// import Blog from './pages/Blog';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import FindBuddies from './pages/FindBuddies';
import SaveMessage from './pages/SaveMessage';
import GetMessages from './pages/GetMessages';
import CreateProfile from './pages/CreateProfile';

function Main({ currentPage, setCurrentPage}) {

  const handleChange = (page) => setCurrentPage(page);

  const renderPage = () => {
    switch (currentPage) {
      case 'About':
        return <About currentPage={currentPage} handleChange={handleChange} />;
      // case 'About':
      //   return <About />;
      // case 'Blog':
      //   return <Blog />;
      case 'SignupForm':
        return <SignupForm />;
      case 'LoginForm':
        return <LoginForm currentPage={currentPage} handleChange={handleChange} />;
      case 'FindBuddies':
        return (
          <section className="row justify-center">
            <FindBuddies currentPage={currentPage} handleChange={handleChange}/>
          </section>
        );
      case 'CreateProfile':
        return <CreateProfile />;
      case 'SaveMessage':
        return <SaveMessage />;
      case 'GetMessages':
        return (
          <section className="row justify-center">
            <GetMessages />
          </section>
        );
      default:
        return <About />
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
