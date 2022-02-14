import React, {useEffect, useState} from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { utils } from '../utils/dateFormat';
import { GET_ME } from '../utils/queries';
import { DELETE_MESSAGE } from '../utils/mutations';
// import { MessengerProvider } from '../utils/GlobalState';

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
    console.log("message._id: ", message._id);

    try {
      const messageToDelete = {
        _id: message._id
      };

      console.log("In handleDeleteMessage, messageToDelete: ",messageToDelete);
      const {result} = await deleteMessage({
        variables: { messageData: messageToDelete },
      });

      const filteredMessages = userData.filter((msg) => msg._id !== message._id);
      setUserData(filteredMessages);
    } catch (err) {
      console.error(err);
    }
  }
    
  if (loading) return <h4>Loading...</h4>;
  if (error) return <h4>Error! {error.message}</h4>;
  // data.users is the array of all users in the database
  console.log("data: ",data, loading);
  // console.log("dateTime: ", utils.dateTime('1644850436776'));

  return (
    userData.map((msg, ndx) =>
      <div key={ndx} className="card-column">
        <figure className="proj-card">
          <p>Message from: {msg.messageFrom}</p>
          <p>Date sent: {msg.createdAt}</p>
          {/* <p>{msg.createdAt.toLocaleString}</p> */}
          {/* <p>formatted date: {formattedTimeStamp}</p> */}
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

