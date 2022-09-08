import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { DELETE_MESSAGE } from '../utils/mutations';

// The state gets changed in the Nav component
function GetMessages ({ currentPage, handleChange }) {
  const pageChange = (page) => handleChange(page);
  const {loading, error, data } = useQuery(GET_ME);
  const [deleteMessage] = useMutation(DELETE_MESSAGE);
  const [userData, setUserData] = useState([]);

  useEffect( ( ) => {
    if (!loading) {
      setUserData(data.me.savedMessages);
    }
  }, [data]);

  // This function deletes the selected message from the current user's message list
  const handleDeleteMessage = async (message) => {
    try {
      const messageToDelete = {
        _id: message._id
      };

      // const {result} = await deleteMessage({
      await deleteMessage({
 
        variables: { messageData: messageToDelete },
      });

      const filteredMessages = userData.filter((msg) => msg._id !== message._id);
      setUserData(filteredMessages);
    } catch (err) {
      console.error(err);
    }
  }
    
  if (loading) return <h4>Loading...</h4>;
  if (error) return <h4>{error.message}</h4>;

  return (
    !userData.length ?
    <h3>No messages!</h3>
    :
    userData.map((msg, ndx) =>
      <div key={ndx} className="card-column">
        <figure className="proj-card">
          <p>Message from: {msg.messageFrom}</p>
          <p>
            Date sent: {new Date(parseInt(msg.createdAt)).toLocaleDateString()} at { new Date(parseInt(msg.createdAt)).toLocaleTimeString()}
          </p>
          <p>{msg.messageText}</p>
          <Button
            type='submit'
            variant='success'
            onClick={() => handleDeleteMessage(msg)}>
            DELETE MESSAGE
          </Button>
        </figure>
      </div>
    )
  )
}

export default GetMessages

