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
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useGlobalContext } from '../utils/GlobalContext';
import Auth from '../utils/auth';

const GetNewPassword = ({ currentPage, handleChange }) => {
  const pageChange = (page) => handleChange(page);
  const [userFormData, setUserFormData] = useState({
    password: '',
    code: '',
  });
  const [errors, setErrors] = useState({});
  const {forgotEmail, forgotCode, setLoggedInUser } = useGlobalContext();
  const [status, setStatus] = useState("");
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [resetPassword] = useMutation(RESET_PASSWORD);

  console.log("In GetNewPassword, userFormData:",userFormData);

  const setField = (field, value) => {
    setUserFormData({
      ...userFormData,
      [field]: value
    })
  
    if (!!errors[field]){
      setErrors({
        ...errors,
        [field]: null
      })
    }
    if (userFormData.code === forgotCode) {
      setValidated(true);
    } else {
      setValidated(false);
    }
    console.log("validated:",validated);
  }
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const validateForm = () => {
      const {password, code} = userFormData;
      const newErrors = {};
    
      if(!password || password === '') {
        newErrors.password = 'Please enter your new password';
      }
      if(!code || code === '') {
        newErrors.code = 'Please enter your security code';
      }

      console.log("code, forgotCode:",code, forgotCode);
      setValidated(code === forgotCode);
      if(code !== forgotCode) {
        console.log("code mismatch");
        newErrors.code = 'Incorrect security code!';
        setValidated(false);
        setUserFormData({
          password: '',
          code: 'Incorrect Security Code',
        });
      }
    }

    const formErrors = validateForm();
    if(formErrors && Object.keys(formErrors).length > 0){
      setErrors(formErrors);
    } else {
      console.log('form submitted:',userFormData);
    }
  
    const newPassword = userFormData.password;

    const resetFormData = {
      email: forgotEmail,
      password: newPassword
    }
    console.log("Ready to try resetPassword, resetFormData:",resetFormData);

    if(validated) {
    try {
      const {data} = await resetPassword({variables: { ...resetFormData}});
      Auth.login(data.resetPassword.token, data.resetPassword.user.username);
      setLoggedInUser(data.resetPassword.user.username);

      setUserFormData({
        password: '',
        code: '',
      });

    } catch (err) {
      console.error(err);
    };
  };
    setStatus("Submitted");
  }

  return (
    <div className="logDiv">
      <Form noValidate validated={validated} style={{ width: '25rem' }} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your password reset!
        </Alert>

        <h1>Password Reset</h1>
        <Form.Group controlId='code'>
          <Form.Label>Security code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter the code sent by email'
            onChange={(e) => setField('code', e.target.value)}
            value={userFormData.code}
            required
          />
          <Form.Control.Feedback type='invalid'>Problem!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter your new password'
            onChange={(e) => setField('password', e.target.value)}
            value={userFormData.password}
            isInvalid={!!errors.password}
            required
          />
          {/* <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback> */}
          <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId='submit'>
          <Button 
            disabled={!(userFormData.code &&
                        userFormData.password) &&
                      !validated}
            type='submit'
            onClick={handleFormSubmit}
            className='my-2' variant='primary'>
            Continue
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default GetNewPassword;
