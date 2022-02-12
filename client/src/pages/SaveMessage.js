import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { SAVE_MESSAGE } from '../utils/mutations';
import Auth from '../utils/auth';
import { useMessengerContext } from '../utils/GlobalState';
import { GET_USERS } from '../utils/queries';

const SaveMessage = () => {

  const [messageInp, setMessageInp] = useState('');

  const [saveMessage] = useMutation(SAVE_MESSAGE);
  const {loading, error, data } = useQuery(GET_USERS);
  console.log("data: ",data);
  const userData = data?.me || {};
  const msgUsr = useMessengerContext();
  const currentUserName = localStorage.getItem("id_name");
  let currentUser;
  let sendToUser;
    // create function to handle saving the profile to the database
  const handleSaveMessage = async () => {

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const messageToSend = {
        messageFrom: currentUserName,
        messageText: messageInp,
        messageTo: msgUsr
      };

      console.log("In handleSaveMessage, messageToSend: ",messageToSend);
      localStorage.setItem("talk2meMsg", messageToSend.messageText); //messageInp);
      const {result} = await saveMessage({
        variables: { messageData: messageToSend },
      });

    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <h4>Loading...</h4>;
  if (error) return <h4>Error! {error.message}</h4>;
  // data.users is the array of all users in the database
  console.log("data: ",data, loading);

  currentUser = data.users.find(element => element.username === currentUserName);
  console.log("currentUser: ", currentUser);

  sendToUser = data.users.find(element => element.username === msgUsr)._id;
  console.log("sendToUser: ", sendToUser);
  localStorage.setItem("sendToUser", sendToUser);

  return (
    <Container>
      <h2>Leave your message for {msgUsr}</h2>
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
              Save message for {msgUsr}
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
