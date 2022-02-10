import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { SAVE_MESSAGE } from '../utils/mutations';
import Auth from '../utils/auth';
import { useMessengerContext } from '../utils/GlobalState';

const Message = () => {

  const [messageInp, setMessageInp] = useState('');

  // const [saveMessage] = useMutation(SAVE_MESSAGE);

  // create function to handle saving the profile to the database
  const handleSaveMessage = async () => {

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const messageToSave = {
        message: messageInp,
      };

      console.log("In handleSaveMessage, messageToSave: ",messageToSave);
      localStorage.setItem("talk2meMsg", messageInp);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <h2>Leave your message for {useMessengerContext()}</h2>
      <Form onSubmit={handleSaveMessage}>
        <Form.Group className="mb-3" controlId="testForm.ControlTextarea">
            <Form.Control as="textarea" rows={10}
              name='name'
              value={messageInp}
              onChange={(e) => setMessageInp(e.target.value)}
            />
        </Form.Group>
        <Button type='submit' variant='success' size='lg'>
          Save message
        </Button>
      </Form>
    </Container>
  );
}

export default Message;
