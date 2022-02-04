import React from "react";

function Resume() {
  return (
    <div className="Resume div">
      <h3>Professor Miriam</h3>
      <article>
        <h4>Summary</h4>
        <p>
        Miriam Champness is a language coach with 25 years of experience helping language
        lovers to refine their English skills.  She is especially good with helping
        advanced second-language students of English.
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
          <dl>
            <dt>ELS</dt>
            <dt>LSI</dt>
            <dt>Cambly</dt>
          </dl>
        </article>
        <article>
          <h4>Education and Training</h4>
          <ul>
            <li>University of Alabama M.A. TESOL 1993</li>
          </ul>
      </article>
    </div>
  );
}

export default Resume;
