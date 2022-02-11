import React from 'react';

function About() {
  return (
    <div className="Aboutdiv">
      <h3>About Talk2Me</h3>
      <article id="about" className="imageArticle">
        <h4>Welcome to Talk2Me</h4>
        <img className="textwrap-img" src="./MHC.jpg" alt="Profile photo" />
        <p>
          Talk2Me is a language practice site for linguaphiles to find one another,
          practice conversation, and share resources.
        </p>
      </article>
      <article>
        <h4>What is a language coach?</h4>
        <p>
          A language coach is ...
        </p>
      </article>
    </div>
  );
}

export default About;