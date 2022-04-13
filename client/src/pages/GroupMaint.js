import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_GROUP } from '../utils/mutations';
import { GET_ALL_GROUPS } from '../utils/queries';

function GroupMaint({ currentPage, handleChange }) {
  const pageChange = (page) => handleChange(page);
  const [deleteGroup] = useMutation(DELETE_GROUP);
  const { loading, error, data, refetch } = useQuery(GET_ALL_GROUPS);
  const [groupToDelete, setGroupToDelete] = useState('');

  // This function deletes users from the database
  const handleDeleteGroup = async (groupName) => {
    console.log("groupName: ",groupName);
    console.log("groupToDelete: ",groupToDelete);
    try {
      const {result} = await deleteGroup({
        variables: { groupName },
        onCompleted: refetch
      });
    
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <h4>Loading...</h4>;
  if (error) return <h4>Error! {error.message}</h4>;
        
  const currentUserName = Auth.getProfile().data.username;
  console.log("currentUserName should be ADMIN: ",currentUserName);
  console.log("data:", data)
        
  return (
    <div className="Admindiv">
      <h3>Admin Group Maintenance</h3>
      {
        data.getAllGroups.map((group, ndx) =>
        <div key={ndx} className="card-column" id={group.groupName}>
          <figure className="proj-card">
            <h4 className="card-title">{group.groupName}</h4>
            <h6>{group.conversationBuddies.length} buddies in the group</h6>
            <ul>
            {group.conversationBuddies.map((group, ndx2) =>
              <div key={ndx2}>
                <li>
                  {group.buddyName}
                </li>
              </div>                 
            )}
            </ul>
            <Button
              type='submit'
              variant='success'
                onClick={() => {
                  handleDeleteGroup(group.groupName);
                  setGroupToDelete(group.groupName);
                }}>
              DELETE GROUP {group.groupName}
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

export default GroupMaint;