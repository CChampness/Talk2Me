import React from 'react';

function About() {
  return (
    <div className="Aboutdiv">
      <section id="about-section">
        <h3>About Talk2Me</h3>
        <article id="about">
          <img className="textwrap-img" src="./Assets/images/MHC.png" alt="Profile photo" />
          <div>
            Talk2Me is a language practice site for linguaphiles to find one another,
            practice conversation, and share resources.
          </div>
        </article>
      </section>
    </div>
  );
}

export default About;