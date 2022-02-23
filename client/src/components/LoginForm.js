// see SignupForm.js for comments
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Form, Button, Alert } from 'react-bootstrap';
import { useGlobalContext } from '../utils/GlobalContext';
import Auth from '../utils/auth';

const LoginForm = ({ currentPage, handleChange }) => {
  const pageChange = (page) => handleChange(page);
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser] = useMutation(LOGIN_USER);
  const { setLoggedInUser } = useGlobalContext();


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    let username;
    try {
      const {data} = await loginUser({variables: {...userFormData}});
      
      console.log("data: ", data);
      Auth.login(data.loginUser.token, data.loginUser.user.username);
      setLoggedInUser(data.loginUser.user.username);
      username = data.loginUser.user.username;

      setUserFormData({
        email: '',
        password: '',
      });
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    if (username === 'ADMIN') {
      console.log("ADMIN");
      pageChange('Admin');
    }
  };

  return (
    <div className="logDiv">
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>

          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
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
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
