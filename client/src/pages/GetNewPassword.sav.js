// Outline:
//+User clicks on "Forgot password" in LoginForm component.
//+ForgotPassword component prompts for user's email and
//+verifies that it is in the database.
//+Email is sent to user's address with a hash code.
//+GetNewPassword component prompts user to put in the code,
// as well as the new password and confirmation.
// Compare password and confirmation.  If valid, then
// new password is hashed and inserted into the database.

import React, { useState} from 'react';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '../utils/mutations';
import { HIT_PASSWORD } from '../utils/mutations';
import { Form, Button, Alert } from 'react-bootstrap';
import { useGlobalContext } from '../utils/GlobalContext';
import Auth from '../utils/auth';

const GetNewPassword = ({ currentPage, handleChange }) => {
  const pageChange = (page) => handleChange(page);
  const [userFormData, setUserFormData] = useState({
    password: '',
    code: '',
  });
  const { forgotUser, forgotEmail, forgotCode, setLoggedInUser } = useGlobalContext();
  const [status, setStatus] = useState("");
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [resetPassword] = useMutation(RESET_PASSWORD);

  console.log("In GetNewPassword, userFormData:",userFormData);
  console.log("In GetNewPassword, forgotUser, forgotEmail, forgotCode:",forgotUser, forgotEmail, forgotCode);
  console.log("start--userFormData:",userFormData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("userFormData before:", userFormData);
    setUserFormData({ ...userFormData, [name]: value });
      if (userFormData.code === forgotCode) {
        setValidated(true);
      } else {
        setValidated(false);
      }
      console.log("userFormData after:", userFormData);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Validate everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    const newPassword = userFormData.password;

    const resetFormData = {
      email: forgotEmail,
      password: newPassword
    }
    console.log("Ready to try resetPassword, resetFormData:",resetFormData);

    try {
      console.log("resetFormData:",resetFormData);
      const {data} = await resetPassword({variables: { ...resetFormData}});
console.log("data returned from resetPassword:",data);
      Auth.login(data.resetPassword.token, data.resetPassword.user.username);
      setLoggedInUser(data.resetPassword.user.username);

      setUserFormData({
        password: '',
        code: '',
      });

    } catch (err) {
      console.error(err);
    };
    setStatus("Submitted");
  }

  return (
    <div className="logDiv">
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <h1>Password Reset</h1>
        <Form.Group>
          <Form.Label htmlFor='code'>Security code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter the code sent by email'
            name='code'
            onChange={handleInputChange}
            value={userFormData.code}
            required
          />
          <Form.Control.Feedback type='invalid'>Problem!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={!(userFormData.code &&
                      userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default GetNewPassword;
