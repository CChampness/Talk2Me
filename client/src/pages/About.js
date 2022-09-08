import React from 'react';
import Auth from '../utils/auth';
// import MsgToAdmin from "../components/MsgToAdmin";


function About({ currentPage, handleChange }) {
  const pageChange = (page) => handleChange(page);
  // function profilePage() {
  //   pageChange('CreateProfile');
  //   }

  const profilePage = () => pageChange('CreateProfile');
  const buddiesPage = () => pageChange('InviteBuddy');
  const groupsPage = () => pageChange('BuildGroup');
  const messagesPage = () => pageChange('Messages');

  return (
    <div className="Aboutdiv">
      <h3>About Talk2Me</h3>
      <p><u>Please note, this app is in Alpha test. *</u></p>
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
          <button className="navButton" onClick={() => {profilePage();}}>Profile</button>
          <br/>
          With the <b>Profile</b> option you can share any interesting information about yourself that will help 
          others who may have shared interests to find you for conversation practice.
        </p>
        <p>
          <button className="navButton" onClick={() => {buddiesPage();}}>Buddies</button>
          <br/>
          With the <b>Buddies</b> option you can find others with whom you may have interests in common.
          You can select any one as a "buddy" and leave messages for them.  Use this feature to set up
          meeting times for conversation on your favorite video chat platform, such as Zoom.
        </p>
        <p>
          <button className="navButton" onClick={() => {groupsPage();}}>Groups</button>
          <br/>
          With the <b>Groups</b> option you can select among your buddies to create a texting group.
        </p>
        <p>
          <button className="navButton" onClick={() => {messagesPage();}}>Messages</button>
          <br/>
          With the <b>Messages</b> option you can see all of the messages that others have left for you.
          Please note that, to receive messages, you must have at least one conversation buddy.
          Use this feature to set up
          meeting times for conversation on your favorite video chat platform, such as Zoom.
        </p>
      </article>
      <p>* Alpha testing is currently underway, and some known bugs are actively being worked.</p>
      {/* <article>
        <MsgToAdmin/>
      </article> */}
    </div>
  );
}

export default About;