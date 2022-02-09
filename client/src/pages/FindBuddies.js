import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { GET_USERS } from '../utils/queries';
import { GET_ME } from '../utils/queries';
import { SAVE_BUDDY } from '../utils/mutations';

// The state gets changed in the Nav component
function FindBuddies ({ currentPage, handleChange }) {
  const {loading, error, data } = useQuery(GET_USERS);
  const [saveBuddy] = useMutation(SAVE_BUDDY);

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

      // if buddy successfully saves to user's account, save buddy id
      // to state
      // setSavedBuddyIds([...savedBuddyIds, buddyToSave.buddyId]);
    } catch (err) {
      console.error(err);
    }

  }
    
    // const userData = data?.users || {};
    if (loading) return <h4>Loading...</h4>;
    if (error) return <h4>Error! {error.message}</h4>;
    console.log("data: ",data, loading);

    
    return (
      data.users.map((user, ndx) =>
        <div key={ndx} className={"card-column"}>
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
          </figure>
        </div>
      )
    )
  }

export default FindBuddies;

{/* <p>{user.profile.interests}</p>
<p>{user.profile.language}</p>
<p>{user.profile.readingLevel}</p>
<p>{user.profile.writingLevel}</p>
<p>{user.profile.grammarLevel}</p>
<p>{user.profile.pronunciationLevel}</p>
<p>{user.profile.sex}</p>
<p>{user.profile.age}</p>
<p>{user.profile.countryFrom}</p>
<p>{user.profile.countryNow}</p>
<p>{user.profile.contactInfo}</p>
<p>{user.email}</p> */}
