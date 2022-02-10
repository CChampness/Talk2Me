import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { SAVE_MESSAGE } from '../utils/mutations';
import Auth from '../utils/auth';
import { useMessengerContext } from '../utils/GlobalState';

const SaveMessage = () => {

  const [messageInp, setMessageInp] = useState('');

  const [saveMessage] = useMutation(SAVE_MESSAGE);
  const msgUsr = useMessengerContext();

  // create function to handle saving the profile to the database
  const handleSaveMessage = async () => {

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const messageToSave = {
        // messageUser: msgUsr,
        messageText: messageInp
      };

      console.log("In handleSaveMessage, messageToSave: ",messageToSave);
      localStorage.setItem("talk2meMsg", messageInp);
      const {result} = await saveMessage({
        variables: { messageData: messageToSave },
      });

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <h2>Leave your message for {useMessengerContext()}</h2>
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
              Save message for {useMessengerContext()}
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </Container>
  );
}

export default SaveMessage;


{/* <Form.Group className="mb-3" controlId="testForm.ControlTextarea">
<Form.Control as="textarea" rows={10}
  name='name'
  value={messageInp}
  onChange={(e) => setMessageInp(e.target.value)}
/>
</Form.Group>

<Button type='submit' variant='success' size='lg'>
Save message
</Button> */}

// return (
//   <Container>
//     <h2>Leave your message for {useMessengerContext()}</h2>
//     <Form onSubmit={handleSaveMessage}>
//       <Form.Row>
//         <Col xs={12} md={8}>
//           <Form.Control
//             name='message'
//             value={messageInp}
//             onChange={(e) => setMessageInp(e.target.value)}
//             type='text'
//             size='lg'
//             placeholder='Please type your message here...'
//           />
//         </Col>
//         <Col xs={12} md={4}>
//           <Button type='submit' variant='success' size='lg'>
//             Save message for {useMessengerContext()}
//           </Button>
//         </Col>
//       </Form.Row>
//     </Form>
//   </Container>
// );
