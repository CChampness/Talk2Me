import React, {useEffect, useState} from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS } from '../utils/queries';
import { SAVE_BUDDY } from '../utils/mutations';
import { MessengerProvider } from '../utils/GlobalState';

const highLightSelected = (cardId) => {
  console.log("highLightSelected, cardId: ", cardId);
  let element = document.getElementById(cardId);
  console.log("element: ",element);
  element.classList.add("boxHighlight");
  // TBD: Add a button for leaving a message (starting a chat)
  // <a >Check this out</a>
}

// The state gets changed in the Nav component
function FindBuddies ({ currentPage, handleChange }) {
  const pageChange = (page) => handleChange(page);
  const {loading, error, data } = useQuery(GET_USERS);
  const [saveBuddy] = useMutation(SAVE_BUDDY);
  const [re, setRe] = useState(false);

  // Step through the list of users and see which ones are in the current user's buddy list.
  useEffect(() => { if (data)
    data.users.map((user) => isAlreadyBuddy(currentUser, user) ? highLightSelected(user.username):null);
  },[re]);
    
  const currentUserName = localStorage.getItem("id_name");

  const isAlreadyBuddy = (currentUser, user) => {
    console.log("isAlreadyBuddy? user.username: ",user.username);
    console.log("currentUser: ",currentUser);
    const found = currentUser.savedBuddies.find(element => element.buddyId === user.username);
    console.log("found: ", found);
    return found;
  }
  
  // This function saves selected buddies to the current user's buddy list
  const handleSaveBuddy = async (username) => {
    console.log("username: ", username);

    try {
      const buddyToSave = {
        buddyId: username
      };

      console.log("In handleSaveBuddy, buddyToSave: ",buddyToSave);
      const {result} = await saveBuddy({
        variables: { buddyData: buddyToSave },
      });

      highLightSelected(username);
      setRe(true);

    } catch (err) {
      console.error(err);
    }
  }
    
  if (loading) return <h4>Loading...</h4>;
  if (error) return <h4>Error! {error.message}</h4>;
  // data.users is the array of all users in the database
  console.log("data: ",data, loading);

  const currentUser = data.users.find(element => element.username === currentUserName);
  console.log("currentUser: ", currentUser);

  return (
    data.users.map((user, ndx) => (user.username === currentUserName)?
      <div key={ndx}></div>
      : 
      <div key={ndx} className="card-column" id={user.username}>
        <figure className="proj-card">
          <span data-descr>
            <a onClick={() => handleSaveBuddy(user.username)}>
              <h4 className="card-title">{user.profile?user.profile.name:user.username}</h4>
              <table><tbody>
                <tr>
                  <td>Interests</td><td><nbsp className="nbsp"/></td><td>{user.profile?user.profile.interests:""}</td>
                </tr>
                <tr>
                  <td>Language</td><td><nbsp className="nbsp"/></td><td>{user.profile?user.profile.language:""}</td>
                </tr>
                <tr>
                  <td>Reading Level</td><td><nbsp className="nbsp"/></td><td>{user.profile?user.profile.readingLevel:""}</td>
                </tr>
                <tr>
                  <td>Writing Level</td><td><nbsp className="nbsp"/></td><td>{user.profile?user.profile.writingLevel:""}</td>
                </tr>
                <tr>
                  <td>Grammar Level</td><td><nbsp className="nbsp"/></td><td>{user.profile?user.profile.grammarLevel:""}</td>
                </tr>
                <tr>
                  <td>Pronunciation</td><td><nbsp className="nbsp"/></td><td>{user.profile?user.profile.pronunciationLevel:""}</td>
                </tr>
                <tr>
                  <td>Sex</td><td><nbsp className="nbsp"/></td><td>{user.profile?user.profile.sex:""}</td>
                </tr>
                <tr>
                  <td>Age</td><td><nbsp className="nbsp"/></td><td>{user.profile?user.profile.age:""}</td>
                </tr>
                <tr>
                  <td>Country From</td><td><nbsp className="nbsp"/></td><td>{user.profile?user.profile.countryFrom:""}</td>
                </tr>
                <tr>
                  <td>Country Now</td><td><nbsp className="nbsp"/></td><td>{user.profile?user.profile.countryNow:""}</td>
                </tr>
                <tr>
                  <td>Contact Info</td><td><nbsp className="nbsp"/></td><td>{user.profile?user.profile.contactInfo:""}</td>
                </tr>
                <tr>
                  <td>email</td><td><nbsp className="nbsp"/></td><td>{user.profile?user.email:""}</td>
                </tr>
              </tbody></table>
            </a>
          </span>
          <Button
            // disabled={!(re)}
            type='submit'
            variant='success'
              onClick={() => {
                  pageChange('SaveMessage');
                  MessengerProvider(user.profile?user.profile.name:user.username)
                }}>
            LEAVE MESSAGE FOR {user.profile?user.profile.name:user.username}
          </Button>
        </figure>
      </div>
    )
  )
}

export default FindBuddies

{/* <Button
disabled={!(userFormData.username && userFormData.email && userFormData.password)}
type='submit'
variant='success'>
NEW BUTTON
</Button> */}
