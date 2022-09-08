import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Container, Col, Form, Button } from 'react-bootstrap';
import { SAVE_MESSAGE } from '../utils/mutations';
import Auth from '../utils/auth';
import { useGlobalContext } from '../utils/GlobalContext';
// import { GET_USERS } from '../utils/queries';

const SaveMessage = () => {
  const [messageInp, setMessageInp] = useState('');
  const [saveMessage] = useMutation(SAVE_MESSAGE);
  // const {loading, error, data } = useQuery(GET_USERS);
  const { messageUser } = useGlobalContext();
  

  let currentUserName;
  // create function to handle saving the profile to the database
  const handleSaveMessage = async (e) => {
    // e.preventDefault();

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const messageToSend = {
        messageFrom: currentUserName,
        messageText: messageInp,
        messageTo: messageUser
      };

      console.log("In handleSaveMessage, messageToSend: ",messageToSend);
      // const {result} = await saveMessage({
        await saveMessage({
        variables: { messageData: messageToSend }
      });

    } catch (err) {
      console.error(err);
    }
  };

  // if (loading) return <h4>Loading...</h4>;
  // if (error) return <h4>{error.message}</h4>;
  // data.users is the array of all users in the database
  currentUserName = Auth.getProfile().data.username;

  return (
    <Container>
      <h2>Leave your message for {messageUser}</h2>
      <Form onSubmit={handleSaveMessage}>
        <Form.Row>
          <Col xs={12} md={8}>
          <Form.Control as="textarea" rows={10}
            name='message'
            value={messageInp}
            onChange={(e) => setMessageInp(e.target.value)}
          />
          </Col>
          <Col xs={12} md={4}>
            <Button type='submit' variant='success' size='lg'>
              Save message for {messageUser}
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  );
}

export default SaveMessage;

