import React, { useState } from 'react';
import ReactNbsp from 'react-nbsp';
import { Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_USER } from '../utils/mutations';
import { GET_USERS } from '../utils/queries';

function UserMaint({ currentPage, handleChange }) {
  const pageChange = (page) => handleChange(page);
  const [deleteUser] = useMutation(DELETE_USER);
  // const {loading, error, data } = useQuery(GET_USERS);
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [userToDelete, setUserToDelete] = useState('');

  // This function deletes users from the database
  const handleDeleteUser = async (username) => {
    // setUserToDelete(username);
    console.log("username: ",username);
    console.log("userToDelete: ",userToDelete);
    try {
      const {result} = await deleteUser({
        variables: { username },
        onCompleted: refetch
      });
    
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
      <h3>Admin User Maintenance</h3>
      {
        data.users.map((user, ndx) => (user.username === currentUserName)?
        <div key={ndx}></div>
        :
        <div key={ndx} className="card-column" id={user.username}>
          <figure className="proj-card">
            <h4 className="card-title">{user.username}</h4>
            <table><tbody>
            {!user.savedBuddies.length ?
              <h3>No conversaion buddies</h3>
            :
              user.savedBuddies.map((buddy, ndx) => (
                <tr><td><ReactNbsp/></td><td>{buddy.buddyName}</td></tr>
              ))}
            </tbody></table>
            <Button
              type='submit'
              variant='success'
                onClick={() => {
                  handleDeleteUser(user.username);
                  setUserToDelete(user.username);
                }}>
              DELETE USER {user.username}
            </Button>
          </figure>
        </div>
      )}
      <Button
        type='submit'
        variant='success'
          onClick={() => {
            pageChange('Admin');
          }}>
        BACK TO ADMIN OPTIONS
      </Button>
    </div>
  );
}

export default UserMaint;