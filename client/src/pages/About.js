import React from 'react';
import { Button } from 'react-bootstrap';
import Auth from '../utils/auth';

function About({ currentPage, handleChange }) {
  const pageChange = (page) => handleChange(page);
  return (
    <div className="Aboutdiv">
      <h3>About Talk2Me</h3>
      <article id="about" className="imageArticle">
        <h4>Welcome to Talk2Me,  {Auth.loggedIn() ? Auth.getProfile().data.username : "please join us ... you may log in or sign up"}</h4>
        <p>
          Welcome to a new horizon in your language-learning quest!
        </p>
        <p>
          Talk2Me is a language practice site for linguaphiles to find one another,
          practice conversation, and share resources. You can use this site to find other
          lovers of language learning who will be happy to share conversation practice with you.
        </p>
        <p>
          With the <b>Profile</b> option you can share any interesting information about yourself that will help 
          others who may have shared interests to find you for conversation practice.
        </p>
        <p>
          With the <b>Buddies</b> option you can find others with whom you may have interests in common.
          You can select any one as a "buddy" and leave messages for them.  Use this feature to set up
          meeting times for conversation on your favorite video chat platform, such as Zoom.
        </p>
        <p>
          With the <b>Messages</b> option you can see all of the messages that others have left for you.
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