import React from 'react';
import { Button } from 'react-bootstrap';
import Auth from '../utils/auth';

function About({ currentPage, handleChange }) {
  const pageChange = (page) => handleChange(page);
  return (
    <div className="Aboutdiv">
      <h3>About Talk2Me</h3>
      <article id="about" className="imageArticle">
        <h4>Welcome to Talk2Me,  {Auth.loggedIn() ? Auth.getProfile().data.username: "please join us ... Login or Signup"}</h4>
        <p>
          Welcome to your language-learning quest!
        </p><p>
          Talk2Me is a language practice site for linguaphiles to find one another,
          practice conversation, and share resources.
        </p>
      </article>
      <article>
        <h4>What is a language-learning coach?</h4>
        <p>
          A language-learning coach is a conversation practice partner who can make interesting suggestions for improving
          your grasp of everyday English.
        </p>
        <p>
          She is a native speaker you can depend on for useful feedback.
        </p>
        <Button
            type='submit'
            variant='success'
              onClick={() => {
                  pageChange('Resume');
                }}>
            About Coach Miriam
          </Button>
      </article>
    </div>
  );
}

export default About;