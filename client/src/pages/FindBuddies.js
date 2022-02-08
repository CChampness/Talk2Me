import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { GET_USERS } from '../utils/queries';
import { GET_ME } from '../utils/queries';

  // The state gets changed in the Nav component
  function FindBuddies ({ currentPage, handleChange }) {
    const {loading, error, data } = useQuery(GET_USERS);

    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!token) {
    //   return false;
    // }

    const userData = data?.users || {};
    if (loading) return <h4>Loading...</h4>;
    if (error) return <h4>Error! ${error.message}</h4>;
    console.log("data: ",data, loading);
  
    // return (
    //   <>
    //   <h1>user data</h1>
    //   <h4>{data.users[0].username}</h4>
    //   <h4>{data.users[1].username}</h4>
    //   <h4>{data.users[2].username}</h4>
    //   </>
    // )

    return (
      data.users.map((user, ndx) =>
        <div key={ndx} className={(ndx === 0) ? "top-card" : "card-column"}>
          <figure className="proj-card">
            <span data-descr>
              <a onClick={() => handleChange(user.username)}>
                <h4 className="card-title">{user.profile.name}</h4>
                <table><tbody>
                  <tr>
                <td>Interests</td><td>{user.profile.interests}</td>
                  </tr>
                  <tr>
                <td>Language</td><td>{user.profile.language}</td>
                </tr>
                  <tr>
                <td>Reading Level</td><td>{user.profile.readingLevel}</td>
                </tr>
                  <tr>
                <td>Writing Level</td><td>{user.profile.writingLevel}</td>
                </tr>
                  <tr>
                <td>Grammar Level</td><td>{user.profile.grammarLevel}</td>
                </tr>
                  <tr>
                <td>Pronunciation</td><td>{user.profile.pronunciationLevel}</td>
                </tr>
                  <tr>
                <td>Sex</td><td>{user.profile.sex}</td>
                </tr>
                  <tr>
                <td>Age</td><td>{user.profile.age}</td>
                </tr>
                  <tr>
                <td>Country From</td><td>{user.profile.countryFrom}</td>
                </tr>
                  <tr>
                <td>Country Now</td><td>{user.profile.countryNow}</td>
                </tr>
                  <tr>
                <td>Contact Info</td><td>{user.profile.contactInfo}</td>
                </tr>
                  <tr>
                <td>email</td><td>{user.email}</td>
                </tr>
                </tbody>
                </table>
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
