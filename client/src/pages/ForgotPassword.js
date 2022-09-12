// Outline:
//+User clicks on "Forgot password" in LoginForm component.
//+ForgotPassword component prompts for user's email and
//+verifies that it is in the database.
//+Email is sent to user's address with a hash code.
//+GetNewPassword component prompts user to put in the code,
//+as well for new password.
// User puts in code, component verifies it.
//+New password is hashed and inserted into the database.

import React, { useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_EMAILS } from '../utils/queries';
import { SEND_EMAIL } from '../utils/mutations';
import { Form, Button, Alert } from 'react-bootstrap';
import { useGlobalContext } from '../utils/GlobalContext';
import Auth from '../utils/auth';
const generator = require('generate-password');


const ForgotPassword = ({ currentPage, handleChange }) => {
  const pageChange = (page) => handleChange(page);
  const [userFormData, setUserFormData] = useState({ email: '' });
  const { setForgotUser, setForgotEmail, setForgotCode } = useGlobalContext();
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const {loading, error, data} = useQuery(GET_ALL_EMAILS);
  const [sendEmail] = useMutation(SEND_EMAIL);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const [status, setStatus] = useState("Submit");

  let validUser = false;
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    validUser = data.emails.find(element => element.email === userFormData.email);
    console.log("validUser?", validUser);
    if (!validUser) {
      setShowAlert(true);
      setUserFormData({ email: '' });
      return;
    };

    const code = generator.generate({
      length: 6,
      numbers: true
    });

    //Send email
    console.log("Now we can send email to:", validUser.email );
    setStatus("Sending...");
    let mailDetails = {
      name: validUser.username,
      email: validUser.email,
      code: code,
    };
    console.log("mailDetails:", mailDetails);

    try {
      const result = await sendEmail({
        variables: { ...mailDetails}
      });
    } catch (err) {
      console.error(err);
    };

    setForgotUser(mailDetails.name);
    setForgotEmail(mailDetails.email);
    setForgotCode(mailDetails.code);
    pageChange('GetNewPassword');
  }

  if (loading) return <h4>Loading...</h4>;
  if (error) return <h4>{error.message}</h4>;

  return (
    <div className="logDiv">
      <Form id="forgotPasswordForm" noValidate validated={validated} onSubmit={handleFormSubmit}>
       <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Incorrect email!
        </Alert>

        <h1>Password Reset</h1>
        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Provide your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={!(userFormData.email)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPassword;
