import React from 'react';
import About from './pages/About';
import Admin from './pages/Admin';
import UserMaint from './pages/UserMaint';
import GroupMaint from './pages/GroupMaint';
import Resume from './pages/Resume';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import InviteBuddy from './pages/InviteBuddy';
import BuildGroup from './pages/BuildGroup';
import SaveMessage from './pages/SaveMessage';
import Messages from './pages/Messages';
import BuddyMessages from './pages/BuddyMessages';
import GroupMessages from './pages/GroupMessages';
import CreateProfile from './pages/CreateProfile';
import { GlobalProvider } from './utils/GlobalContext';


function Main({ currentPage, setCurrentPage}) {
  const handleChange = (page) => setCurrentPage(page);

  const renderPage = () => {
    switch (currentPage) {
      case 'About':
        return <About currentPage={currentPage} handleChange={handleChange} />;
      case 'Admin':
        return <Admin currentPage={currentPage} handleChange={handleChange} />;
      case 'UserMaint':
        return <UserMaint currentPage={currentPage} handleChange={handleChange} />;
      case 'GroupMaint':
        return <GroupMaint currentPage={currentPage} handleChange={handleChange} />;
      case 'SignupForm':
        return <SignupForm currentPage={currentPage} handleChange={handleChange} />;
      case 'LoginForm':
        return <LoginForm currentPage={currentPage} handleChange={handleChange} />;
      case 'InviteBuddy':
        return (
          <section className="row justify-center">
            <InviteBuddy currentPage={currentPage} handleChange={handleChange}/>
          </section>
        );
      case 'BuildGroup':
        return (
          <section className="row justify-center">
            <BuildGroup currentPage={currentPage} handleChange={handleChange}/>
          </section>
        );
      case 'CreateProfile':
        return <CreateProfile />;
      case 'SaveMessage':
        return <SaveMessage />;
      case 'BuddyMessages':
        return <BuddyMessages />;
        case 'GroupMessages':
          return <GroupMessages />;
        case 'Messages':
        return (
          <section className="row justify-center">
            <Messages currentPage={currentPage} handleChange={handleChange} />
          </section>
        );
      case 'Resume':
        return <Resume />;
      default:
        return <About />
    }
  };

  return (
    <main>
      <>
        <hr/>
        <br/>
        <GlobalProvider>
          {renderPage()}
        </GlobalProvider>
      </>
    </main>
  );
}

export default Main;
