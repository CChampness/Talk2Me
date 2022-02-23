import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_USER } from '../utils/mutations';
import { GET_USERS } from '../utils/queries';

function Admin({ currentPage, handleChange }) {
  const pageChange = (page) => handleChange(page);
  const [deleteUser] = useMutation(DELETE_USER);
  const {loading, error, data } = useQuery(GET_USERS);
  const [userToDelete, setUserToDelete] = useState('');

  // This function deletes users from the database
  const handleDeleteUser = async (username) => {
    // setUserToDelete(username);
    console.log("username: ",username);
    console.log("userToDelete: ",userToDelete);
    try {
      // await deleteUser({
      const {result} = await deleteUser({variables: { username }});
    
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <h4>Loading...</h4>;
  if (error) return <h4>Error! {error.message}</h4>;
  // data.users is the array of all users in the database
        
  const currentUserName = Auth.getProfile().data.username;
  console.log("currentUserName should be ADMIN: ",currentUserName);
        
  return (
    <div className="Admindiv">
      <h3>Admin Functions</h3>
      {
        data.users.map((user, ndx) => (user.username === currentUserName)?
        <div key={ndx}></div>
        :
        <div key={ndx} className="card-column" id={user.username}>
          <figure className="proj-card">
            <h4 className="card-title">{user.username}</h4>
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
            <Button
              type='submit'
              variant='success'
                onClick={() => {
                  setUserToDelete(user.username);
                  handleDeleteUser(user.username);
                }}>
              DELETE USER {user.username}
            </Button>
          </figure>
        </div>
      )}
    </div>
  );
}

export default Admin;