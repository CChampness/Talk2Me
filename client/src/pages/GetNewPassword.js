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
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useGlobalContext } from '../utils/GlobalContext';
import Auth from '../utils/auth';

const GetNewPassword = ({ currentPage, handleChange }) => {
  const pageChange = (page) => handleChange(page);
  const [userFormData, setUserFormData] = useState({
    password: '',
    code: '',
  });
  // const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
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

  const setField = (field, value) => { //called from onChange setField('dob', e.target.value)
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
  }
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // // Validate everything (as per react-bootstrap docs)
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    // setValidated(true);

    const validateForm = () => {
      const {password, code} = userFormData;
      const newErrors = {};
    
      if(!password || password === '') {
        newErrors.password = 'Please enter your new password';
      }
      if(!code || code === '') {
        newErrors.code = 'Please enter your security code';
      }
    }
    
    const formErrors = validateForm();
    if(formErrors && Object.keys(formErrors).length > 0){
      setErrors(formErrors);
    } else {
      console.log('form submitted');
      console.log(userFormData);
    }
  
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
            placeholder='Your password'
            onChange={(e) => setField('password', e.target.value)}
            value={userFormData.password}
            isInvalid={!!errors.password}
            required
          />
          {/* <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback> */}
          <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>

        </Form.Group>

        <Form.Group controlId='submit'>
          <Button type='submit' onClick={handleFormSubmit} className='my-2' variant='primary'>
            Continue
          </Button>
        </Form.Group>

        {/* <Button
          disabled={!(userFormData.code &&
                      userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button> */}
      </Form>
    </div>
  );
};

export default GetNewPassword;

// https://www.youtube.com/watch?v=PCZ-ByiRxT8

// step 1.
// const [form, setForm] = useState({});
// const [errors, setErrors] = useState({});

// step 2.
// const setField = (field, value) => { //called from onChange setField('dob', e.target.value)
//   setForm({
//     ...form,
//     [field]: value
//   })

//   if (!!errors[field]){
//     setErrors({
//       ...errors,
//       [field]: null
//     })
//   }
// }

// step 3.

// const validateForm = () => {
//   const {dob, etc} = form;
//   const newErrors = {};

//   if(!dob || dob === '') newErrors.dob = 'Please enter your date of birth';
//   etc..
// }

// const handleSubmit = e => {
//   e.preventDefault();

//   const formErrors = validateForm();
//   if(Object.keys(formErrors).length > 0){
//     setErrors(formErrors);
//   } else {
//     console.log('form submitted');
//     console.log(form);
//   }
// }

{/* <Form.Group controlId='submit'>
  <Button type='submit' onClick={handleSubmit} className='my-2' variant='primary'>
    Continue
  </Button>
</Form.Group> */}

// {Container, Row, Col} from 'react-bootstrap';
// const FormContainer = ({ children }) => {
//   return (
//     <Container>
//       <Row className='justify-content-md-center'>
//         <Col xs={12} md={6}>
//           {children}
//         </Col>
//       </Row>
//     </Container>
//   )
// }