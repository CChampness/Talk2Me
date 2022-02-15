import React, { useState } from 'react';
import About from './pages/About';
import Resume from './pages/Resume';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import FindBuddies from './pages/FindBuddies';
import SaveMessage from './pages/SaveMessage';
import GetMessages from './pages/GetMessages';
import CreateProfile from './pages/CreateProfile';
import { GlobalProvider } from './utils/GlobalContext';


function Main({ currentPage, setCurrentPage}) {
  const handleChange = (page) => setCurrentPage(page);

  const renderPage = () => {
    switch (currentPage) {
      case 'About':
        return <About currentPage={currentPage} handleChange={handleChange} />;
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
      <>
        <hr/>
        <GlobalProvider>
          {renderPage()}
        </GlobalProvider>
      </>
    </main>
  );
}

export default Main;
