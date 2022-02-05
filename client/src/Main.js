import React, { useState } from 'react';
import About from './pages/About';
import Resume from './pages/Resume';
import Blog from './pages/Blog';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Buddies from './components/Buddies';
// import Projects from './pages/Projects';
// import Contact from './pages/Contact';
// import Mt from './pages/Mt';
// import Cq from './pages/Cq';
// import Fsb from './pages/Fsb';
// import Tan from './pages/Tan';
// import Tpg from './pages/Tpg';
// import Wa from './pages/Wa';
// import Dp from './pages/Dp';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';

function Main({ currentPage, setCurrentPage}) {

  const handleChange = (page) => setCurrentPage(page);

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return 'Resume';
      case 'About':
        return <About />;
      case 'Blog':
        return <Blog />;
      case 'SignupForm':
        return <SignupForm />;
      case 'LoginForm':
        return <LoginForm />;
      case 'Buddies':
        return <Buddies />;
      // case 'Projects':
      //   return (
      //     <section className="row justify-center">
      //       <h3>Portfolio</h3>
      //       <Projects  currentPage={currentPage} handleChange={handleChange}/>
      //     </section>
      //   );
      // case 'Contact':
      //   return <Contact />;
      // case 'Mt':
      //   return <Mt />;
      // case 'Cq':
      //   return <Cq />;
      // case 'Dp':
      //   return <Dp />;
      // case 'Fsb':
      //   return <Fsb />;
      // case 'Tan':
      //   return <Tan />;
      // case 'Tpg':
      //   return <Tpg />;
      // case 'Wa':
      //   return <Wa />;
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
