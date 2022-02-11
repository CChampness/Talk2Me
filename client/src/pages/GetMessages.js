import React, {useEffect, useState} from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { DELETE_MESSAGE } from '../utils/mutations';
import { MessengerProvider } from '../utils/GlobalState';

// The state gets changed in the Nav component
function GetMessages ({ currentPage, handleChange }) {
  const pageChange = (page) => handleChange(page);
  const {loading, error, data } = useQuery(GET_ME);
  const [deleteMessage] = useMutation(DELETE_MESSAGE);
  const [re, setRe] = useState(false);

  const currentUserName = localStorage.getItem("id_name");

  // This function deletes the selected message from the current user's message list
  const handleDeleteMessage = async (messageId) => {
    console.log("messageId: ", messageId);

    try {
      const messageToDelete = {
        _id: messageId
      };

      console.log("In handleDeleteMessage, messageToDelete: ",messageToDelete);
      const {result} = await deleteMessage({
        variables: { msgDelData: messageToDelete },
      });

      setRe(true);

    } catch (err) {
      console.error(err);
    }
  }
    
  if (loading) return <h4>Loading...</h4>;
  if (error) return <h4>Error! {error.message}</h4>;
  // data.users is the array of all users in the database
  console.log("data: ",data, loading);

  return (
    data.me.savedMessages.map((msg, ndx) =>
      <div key={ndx} className="card-column">
        <figure className="proj-card">
          <p>{msg.messageText}</p>
          <p>{msg._id}</p>
          <Button
            type='submit'
            variant='success'
            onClick={() => handleDeleteMessage(msg._id)}>
            DELETE MESSAGE
          </Button>
        </figure>
      </div>
    )
  )
}

export default GetMessages

