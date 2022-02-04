import React, { useState } from 'react';
// import About from './pages/About';
// import Projects from './pages/Projects';
// import Contact from './pages/Contact';
import Resume from './pages/Resume';
// import Mt from './pages/Mt';
// import Cq from './pages/Cq';
// import Fsb from './pages/Fsb';
// import Tan from './pages/Tan';
// import Tpg from './pages/Tpg';
// import Wa from './pages/Wa';
// import Dp from './pages/Dp';


function Main({ currentPage, setCurrentPage}) {

  const handleChange = (page) => setCurrentPage(page);

  const renderPage = () => {
    switch (currentPage) {
      // case 'About':
      // return <About />;
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
