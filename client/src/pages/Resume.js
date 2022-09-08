import React from "react";

function Resume() {
  return (
    <div className="Resumediv">
      <h3>Coach Miriam</h3>
      <article className="imageArticle">
        <h4>Summary</h4>
        <img className="textwrap-img" src="./MHC.jpg" alt="Profile" />
        <p>
        Miriam Champness is a language-learning coach with 25 years of experience helping 
        language lovers to deepen and refine their English-learning process.  She is especially good
        with coaching advanced students of English.
        </p>
      </article>
      <article>
        <h4>Skills</h4>
        <ul>
          <li>Internet coaching</li>
          <li>Usage</li>
          <li>Technical discourse</li>
          <li>Grammar</li>
          <li>Pronunciation</li>
          <li>Fluency</li>
        </ul>
      </article>
      <article>
        <h4>Experience</h4>
        <ul>
          <li>ELS</li>
          <li>LSI</li>
          <li>Cambly</li>
        </ul>
      </article>
      <article>
        <h4>Education and Training</h4>
        <ul>
          <li>University of Alabama M.A. TESOL</li>
          <li>Boston University B.A. Psychology</li>
        </ul>
      </article>
    </div>
  );
}

export default Resume;

