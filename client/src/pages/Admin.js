import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function Admin({ currentPage, handleChange }) {
  const pageChange = (page) => handleChange(page);
  const [selectedTgtType, setSelectedTgtType] = useState([]);


  const handleSelection = async (e) => {
    e.preventDefault();
    // Go to a page for either user collection maintenance or group maintenance
    if (e.target.id === "User") {
      pageChange('UserMaint');
    } else {
      pageChange('GroupMaint');
    }
  }

  const handleTgtChange = e => {
    e.persist();
    console.log("e.target", e.target);
    setSelectedTgtType(e.target.value);
    console.log("in Admin handleTgtChange, selectedTgtType:",selectedTgtType);
  };


  return (
    <Container>
      <h4>Select the collection to maintain</h4>
      <hr/>
      <>
        <Form onSubmit={handleSelection}>
          <Form.Group>
              <Form.Check className="rads"
                name="msgTarget"
                id="User"
                label="User"
                onChange = {handleTgtChange}
                type='radio'
                value="User"
              />
              <Form.Check className="rads"
                name="msgTarget"
                id="Group"
                label="Group"
                onChange = {handleTgtChange}
                type='radio'
                value="Group"
              />

          </Form.Group>
          <Button
            type='submit'
            variant='success'
          >
            GO TO SELECTION
          </Button>
        </Form>
      </>
    </Container>
  );
}

export default Admin;
