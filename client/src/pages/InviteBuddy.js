import React, {useEffect, useState} from 'react';
import ReactNbsp from 'react-nbsp';
import { Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS } from '../utils/queries';
import { SAVE_BUDDY } from '../utils/mutations';
import Auth from '../utils/auth';
import { useGlobalContext } from '../utils/GlobalContext';

let extraMsg;

const highLightInvited = (cardId) => {
console.log("highLightInvited: ",cardId);
  let element = document.getElementById(cardId);
  if (element && element.childNodes[0]) {
    element.childNodes[0].childNodes[0].classList.add("boxHLPending");
    console.log("text:",element.childNodes[0].childNodes[0].childNodes[0].childNodes[0].innerText);
    extraMsg = "(Invited, not yet accepted)";
    element.childNodes[0].childNodes[0].childNodes[0].childNodes[1].innerText = extraMsg;
    element.childNodes[0].childNodes[0].childNodes[0].childNodes[1].style.color = "black";
    // element.childNodes[0].childNodes[0].childNodes[0].childNodes[1].style.fontSize = "50%";
  }
}

const highLightSelected = (cardId) => {
  let element = document.getElementById(cardId);
  if (element && element.childNodes[0]) {
    element.childNodes[0].childNodes[0].classList.add("boxHighlight");
    extraMsg = "Current Buddy";
  }
}

// When the current user selects a Buddy, it means that that Buddy can
// now invite the current user into a group that the Buddy has started.

// The state gets changed in the Nav component
function InviteBuddy ({ currentPage, handleChange }) {
  const pageChange = (page) => handleChange(page);
  const {loading, error, data, refetch } = useQuery(GET_USERS);
  const [saveBuddy] = useMutation(SAVE_BUDDY);
  const [currentUserName, setCurrentUserName] = useState('');
  const { setMessageUser } = useGlobalContext();

  // Step through the list of users and see which ones are in the current user's buddy list.
  // useEffect(() => { if (data)
  //   data.users.map((user) => isInvitedBuddy(currentUser, user) ? highLightInvited(user.username):
  //     (isAlreadyBuddy(currentUser, user) ? highLightSelected(user.username):null));
  // },[currentUserName, data]);
  useEffect(() => { if (data)
    data.users.map((user) =>
      (buddyStatus(currentUser, user) === "Invited") ? highLightInvited(user.username):
      ((buddyStatus(currentUser, user) === "Buddy") ? highLightSelected(user.username):null)
    );
  },[currentUserName, data]);

  const thisUserHasInvitedMe = (userName) => {
    console.log("thisUserHasInvitedMe:", userName);
    const user = data.users.find(element => element.username === userName);
    console.log("thisUserHasInvitedMe:", user.username);
    if (user && user.username === userName) {
      const niceUser = user.savedBuddies.find(element => (
        (element.buddyName === currentUserName) &&
        (element.status === "Invited")
      ));
      console.log("niceUser:", niceUser);
      if (niceUser) {
        highLightInvited(userName);
        return true;
      }
    }
    return false;
  }
  
  const handleAccept = (userName) => {
    console.log("Accept invitation from ",userName);
  }
  
  // If the "user" is in my buddy list AND his status is "Buddy", then return true;
  const buddyStatus = (currentUser, user) => {
    const found = currentUser.savedBuddies.find(element => element.buddyName === user.username);
    if (found) {
      console.log("buddyStatus for:", user.username, found.status);
      return found.status;
    }
    console.log("buddyStatus for:", user.username, false);
    return false;
  }

  // If the "user" is in my buddy list AND his status is "Invited", then return true;
  const isInvitedBuddy = (currentUser, user) => {
    const found = currentUser.savedBuddies.find(element => element.buddyName === user.username);
    if (found && found.status === "Invited") {
      console.log("isAlreadyBuddy:", "Invited");
      return true;
    }
    console.log("isInvitedBuddy:", false);
    return found;
  }
 
  const handleInviteBuddy = async (username) => {
    try {
      const buddyToInvite = {
        buddyName: username,
        status: "Invited"
      };
      console.log("handleInviteBuddy, buddyToInvite: ",buddyToInvite);

      await saveBuddy({
        variables: { buddyData: buddyToInvite },
        onCompleted: refetch
      });

      highLightInvited(username);

    } catch (err) {
      console.error(err);
    }
  }
    
  // This function saves selected buddies to the current user's buddy list
  const handleSaveBuddy = async (username) => {
    try {
      const buddyToSave = {
        buddyName: username
      };
      console.log("handleSaveBuddy, buddyToSave: ",buddyToSave);

      await saveBuddy({
        variables: { buddyData: buddyToSave },
        onCompleted: refetch
      });

      highLightSelected(username);

    } catch (err) {
      console.error(err);
    }
  }
    
  if (loading) return <h4>Loading...</h4>;
  if (error) return <h4>Error! {error.message}</h4>;
  // data.users is the array of all users in the database

  let currentUser;
  if (currentUserName) {
    currentUser = data.users.find(element => element.username === currentUserName);
    data.users.map((user) =>
      (buddyStatus(currentUser, user) === "Invited") ? highLightInvited(user.username):
      ((buddyStatus(currentUser, user) === "Buddy") ? highLightSelected(user.username):null));
  } else {
    setCurrentUserName(Auth.getProfile().data.username);
  }

  return (
    (data.users.length <= 1) ?
      <h3>No buddies selected yet!</h3>
    :
    data.users.map((user, ndx) => (user.username === currentUserName || user.username === 'ADMIN')?
      <div key={ndx}>
      </div>
      :
      <div key={ndx} className="card-column" id={user.username}>
        <figure className="proj-card">
          <span data-descr>
            <a onClick={() => handleInviteBuddy(user.username)}>
              <h4 className="card-title">{user.username}</h4>
              <div></div>
              <table><tbody>
                <tr>
                  <td>Interests</td><td><ReactNbsp/></td><td>{user.profile?user.profile.interests:""}</td>
                </tr>
                <tr>
                  <td>Language</td><td><ReactNbsp/></td><td>{user.profile?user.profile.language:""}</td>
                </tr>
                <tr>
                  <td>Writing Level</td><td><ReactNbsp/></td><td>{user.profile?user.profile.writingLevel:""}</td>
                </tr>
                <tr>
                  <td>Grammar Level</td><td><ReactNbsp/></td><td>{user.profile?user.profile.grammarLevel:""}</td>
                </tr>
                <tr>
                  <td>Pronunciation Level</td><td><ReactNbsp/></td><td>{user.profile?user.profile.pronunciationLevel:""}</td>
                </tr>
                <tr>
                  <td>Reading Level</td><td><ReactNbsp/></td><td>{user.profile?user.profile.readingLevel:""}</td>
                </tr>
                <tr>
                  <td>Country From</td><td><ReactNbsp/></td><td>{user.profile?user.profile.countryFrom:""}</td>
                </tr>
                <tr>
                  <td>Country Now</td><td><ReactNbsp/></td><td>{user.profile?user.profile.countryNow:""}</td>
                </tr>
              </tbody></table>
            </a>
          </span>
          {thisUserHasInvitedMe(user.username) ?
            <Button
              type='submit'
              variant='success'
                onClick={() => {
                  handleAccept(user.username);
                }}>
              ACCEPT INVITATION FROM {user.username}
            </Button>
            :
            null
          }
        </figure>
      </div>
    )
  )
}

export default InviteBuddy
