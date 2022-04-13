import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS } from '../utils/queries';
import { SAVE_BUDDY } from '../utils/mutations';
import Auth from '../utils/auth';
import { useGlobalContext } from '../utils/GlobalContext';

const highLightSelected = (cardId) => {
  let element = document.getElementById(cardId);
  if (element && element.childNodes[0]) { // && element.childNodes[0].childNodes[0]) {
    element.childNodes[0].childNodes[0].classList.add("boxHighlight");
  }
}

// When the current user selects a Buddy, it means that that Buddy can
// now invite the current user into a group that the Buddy has started.

// The state gets changed in the Nav component
function FindBuddies ({ currentPage, handleChange }) {
  const pageChange = (page) => handleChange(page);
  const {loading, error, data, refetch } = useQuery(GET_USERS);
  const [saveBuddy] = useMutation(SAVE_BUDDY);
  const [currentUserName, setCurrentUserName] = useState('');
  const { setMessageUser } = useGlobalContext();

  // Step through the list of users and see which ones are in the current user's buddy list.
  useEffect(() => { if (data)
    data.users.map((user) => isAlreadyBuddy(currentUser, user) ? highLightSelected(user.username):null);
  },[currentUserName, data]);
// },[currentUserName]);
// Line 27:5:   React Hook useEffect has missing dependencies: 'currentUser' and 'data'. Either include them or remove the dependency array

  const isAlreadyBuddy = (currentUser, user) => {
    const found = currentUser.savedBuddies.find(element => element.buddyName === user.username);
    return found;
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
    data.users.map((user) => isAlreadyBuddy(currentUser, user) ? highLightSelected(user.username):null);
  } else {
    setCurrentUserName(Auth.getProfile().data.username);
  }

  console.log("data.users.length:",data.users.length);
  console.log("data.users[0].username:",data.users[0].username);

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
            <a onClick={() => handleSaveBuddy(user.username)}>
              <h4 className="card-title">{user.username}</h4>
              <table><tbody>
                <tr>
                  <td>Interests</td><td><nbsp className="nbsp"/></td><td>{user.profile?user.profile.interests:""}</td>
                </tr>
                <tr>
                  <td>Language</td><td><nbsp className="nbsp"/></td><td>{user.profile?user.profile.language:""}</td>
                </tr>
                <tr>
                  <td>Country From</td><td><nbsp className="nbsp"/></td><td>{user.profile?user.profile.countryFrom:""}</td>
                </tr>
                <tr>
                  <td>Country Now</td><td><nbsp className="nbsp"/></td><td>{user.profile?user.profile.countryNow:""}</td>
                </tr>
              </tbody></table>
            </a>
          </span>
          {/* <Button
            type='submit'
            variant='success'
              onClick={() => {
                  // useGlobalContext
                  setMessageUser(user.username);
                  pageChange('SaveMessage');
                }}>
            LEAVE MESSAGE FOR {user.username}
          </Button> */}
        </figure>
      </div>
    )
  )
}

export default FindBuddies
